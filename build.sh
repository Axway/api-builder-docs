#!/bin/bash
#
# Intro:
#   The previous version of this script was used to manage common contents store in a separate git
#   projected called axway-open-docs-common. A lot of the common content is now redundant and was
#   removed so the project was updated accordingly to be simpler and self contained apart from the
#   themes it uses. This script still serves a function as a build wrapper that automates certain
#   pre-build tasks.
#
# Description:
#   This is roughly the flow of the script:
#     1. make sure "go" is available
#     2. install npm dependencies used by docsy
#     3. update config.toml
#     4. runs "hugo server" to build the site and the
#        micro site will be available on http://localhost:1313/
#
# Usage:
#   ./build.sh          (dev mode)
#   ./build.sh -m ci    (continuous integration mode used by Jenkins)
#

set -e

PROJECT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
BRANCH_NAME=${BRANCH_NAME} # the BRANCH_NAME variable comes from Jenkins
GO_HOME=${GO_HOME} # go home directory which is provided by Jenkins
DEBUG=${DEBUG:-false}
MODE=dev

while getopts ":m:" opt; do
    case ${opt} in
        m ) MODE=$OPTARG
             ;;
        * ) echo "[ERROR] Invalid option [${OPTARG}]!!";exit 1
            ;;
    esac
done

# fInstallGo:
#   - if go is not in the system path then this script will download and install it and make it available for the script
#   - note that default hugo cache folder is /tmp/hugo_cache/
function fInstallGo() {
    local go_ver
    local go_dir

    if [[ -f "go.mod" ]]; then
        # alternatively we can use latest go version by getting version from "https://go.dev/VERSION?m=text" which gets back go1.20
        go_ver=$(cat go.mod | grep "^go " | head -n 1 | awk '{ print $2 }')
    else
        echo "[ERROR] Missing file [go.mod]."
        exit 1
    fi
    go_ver=${go_ver:-1.20} # give go a default version
    go_dir="${HOME}/bin/go${go_ver}"

    # add the go directories to PATH to see if they exist
    export PATH=${go_dir}/bin:${GO_HOME}/bin:$PATH

    if [[ -x "$(command -v go)" ]]; then
        echo "[INFO] The [go] command is found in [$(command -v go)]!"
    else
        echo "[INFO] The [go] command is not detected in your environment."
        echo "[INFO] Go home directory set to [${go_dir}]."
        if [[ -d "${go_dir}" ]];then
            echo "[INFO] Go home directory [${go_dir}] already exist but no executable [go] binary was found."
            _date_timestamp=$(date '+%Y%m%d%H%M%S')
            echo "[INFO] Moving this to [${go_dir}-${_date_timestamp}]!"
            mv -f "${go_dir}" "${go_dir}-${_date_timestamp}"
        fi

        echo "[INFO] Installing go v${go_ver} to [${go_dir}]."
        #https://go.dev/dl/go1.20.linux-amd64.tar.gz
        mkdir -p ${go_dir}
        curl -sL https://go.dev/dl/go${go_ver}.linux-amd64.tar.gz | tar -xz -C ${go_dir} --strip-components 1

        if ! [ -x "$(command -v go)" ]; then
            echo "[ERROR] The [go] program is still not available after download/setup step!"
            exit 1
        fi
    fi
}

# fInstallNpmDependencies:
#   - makes sure npm dependencies are available
function fInstallNpmDependencies() {
    echo "[INFO] Install npm packages required by docsy."
    if [[ -f "package.json" ]];then
        npm install
    else
        npm install -D --save autoprefixer
        npm install -D --save postcss
        npm install -D --save postcss-cli
    fi
}

# fUpdateConfigToml:
#   - note that this function can do more if there are more requirements
#   - at the moment it's just used to figure out what the github repo url and branch is and update the config.toml accordingly
#       - these settings are used for the "Edit on Github" link on the right hand menu
#   - also updates the Github link on the main landing page (content/en/_index.html)
function fUpdateConfigToml() {
    local github_repo=$(git remote -v | grep origin.*push | sed -e "s|origin[[:space:]]\(.*\)[[:space:]](push)|\1|g" | sed -e "s|git@github.com:|https://github.com/|g" | sed -e "s|\.git||g")
    local branch_name=${BRANCH_NAME}

    sed -i "s|github_repo = .*|github_repo = \"${github_repo}\"|g" config.toml
    sed -i "s|href=\"http.*\"|href=\"${github_repo}\"|g" content/en/_index.html

    # Update the github_branch Param value in config.toml. This is used by the github edit link. If
    # the BRANCH_NAME is not set or if it's a pull request then the link shouldn't appear in the preview.
    if [[ "${branch_name}" =~ ^"PR-"* ]];then
        echo "[INFO] The branch name [${branch_name}] indicates it's a pull request so trying to determine original branch name."
        _github_api_url="$(echo ${github_repo} | sed -e "s|https://github.com/|https://api.github.com/repos/|g")/pulls/$(echo ${branch_name} | cut -d "-" -f 2)"
        echo "[INFO] Github API url is [${_github_api_url}]."
        if [[ -n "${GITHUB_TOKEN}" ]];then
            branch_name=$(curl -s -H "Authorization: Bearer ${GITHUB_TOKEN}" ${_github_api_url} | jq -r .head.ref)
            echo "[INFO] The [branch_name] for the pull request should be [${branch_name}]."
        else
            echo "[WARN] No [GITHUB_TOKEN] set so can't determine original branch name!" 
        fi
    fi
    if [[ ! "${branch_name}" =~ ^"PR-"* ]];then
        echo "[INFO] Updating [config.toml] with branch name [${branch_name}]."
        sed -i "s|# github_branch|github_branch|g" config.toml
        sed -i "s|github_branch = .*|github_branch = \"${branch_name}\"|g" config.toml
    fi
}

function fRunHugo() {
    cd ${PROJECT_DIR}
    case "${MODE}" in
      "dev")
          hugo server
          ;;
      "ci")
        # buildFuture allows the notes for the current release to be generated
          hugo --buildFuture
          ;;
      *)
          echo "[ERROR] Build MODE [${MODE}] is invalid!!"
          exit 1
          ;;
    esac
}

fInstallGo
fInstallNpmDependencies
fUpdateConfigToml
fRunHugo
echo "[INFO] Done."