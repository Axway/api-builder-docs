#!/bin/bash
#
# Intro:
#	This is a workaround for managing common content and merging them with the
#	microsite before doing a hugo build. The hugo modules should be used instead
#	but the theme "docsy" is not compatible with it at the moment. Once "docsy"
#	have been updated by the devs to work with hugo modules then we can abandon this
#	and use hugo modules instead.
#
# Description:
#   This is roughly the flow of the script:
#     1. make sure "themes/docsy/"" submodule is checked out recursively
#     2. make sure the "axway-open-docs-common/ submodule is checked out
#     3. make sure the npm packages "postcss-cli" and "autoprefixer" are installed
#     4. combine the "axway-open-docs-common" files with the "amplifycentral-open-docs"
#        files and put them in the "build" folder
#     5. runs "hugo server" from inside the build folder to build the site and the
#        micro site will be available on http://localhost:1313/
#
# Notes:
#   - static files can't be symlinked so if they are changed then you need to rerun
#     the build script
#   - all other files like content/en/ content will be picked up by hugo automatically
#     if they change
#   - 
#

DEBUG=${DEBUG:-false}
MODE=dev
while getopts ":np" opt; do
    case ${opt} in
        n ) MODE=nelify
             ;;
        p ) MODE=nelify-preview
             ;;
        * ) exit 1
            ;;
    esac
done

PROJECT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
BUILD_DIR=${PROJECT_DIR}/build
AXWAY_COMMON_DIR="axway-open-docs-common"

# fCheckoutSubmodule:
#   - makes sure the submodules are checked out
#   - microsite should only have the axway-open-docs-common as a submodule
#   - the docsy theme is a submodule of axway-open-docs-common
function fCheckoutSubmodule() {
    echo "[INFO] Makes sure [${AXWAY_COMMON_DIR}] submodule is checked out."

    if [[ -d "${AXWAY_COMMON_DIR}" ]];then
        git submodule update --init --force --recursive --checkout
        echo "[INFO] ====================[ submodule info ]===================="
        git submodule status
        cd ${AXWAY_COMMON_DIR} > /dev/null
        git submodule status
        cd ${PROJECT_DIR} > /dev/null
        echo "[INFO] =========================================================="
    else
        echo "[ERROR] Can't find the common content directory [${AXWAY_COMMON_DIR}]."
        exit 1
    fi
    # the npm packages doesn't seem to be needed on the netify build server...this is just for developers
    if [[ "${MODE}" == "dev" ]];then
        echo "[INFO] Install npm packages required by docsy."
    	if [[ ! -d "node_modules" ]];then
    		npm install -D --save autoprefixer
    		npm install -D --save postcss-cli
    	fi
    fi
}

# fMergeContent:
#  1. makes sure BUILD_DIR is clean
#  2. copies axway-open-docs-common to BUILD_DIR
#  3. copies all static content from micro site to BUILD_DIR
#  3. create symlinks in BUILD_DIR to access all other micro site content
#  4. list symlinks (this is just info for easy debugging if here's an issue)
function fMergeContent() {
    IFS_SAVE="${IFS}"
    IFS=$'\n'
    local axway_common_name=${AXWAY_COMMON_DIR}
    local _c_context
    local _c_path
    local _c_name
    local _ln_opt='-sf'
    if [[ "$DEBUG" == "true" ]];then
        _ln_opt='-vsf'
    fi

    cd ${PROJECT_DIR}
    rm -rf ${BUILD_DIR}
    echo "[INFO] Put all [${axway_common_name}] content into [build] directory."
    rsync -a ${axway_common_name}/ build --exclude .git
    if [[ $? -ne 0 ]];then
        echo "[ERROR] Looks like rsync failed!"
        exit 1
    fi

    # content in static folder can't be a symlink
    echo "[INFO] Merging [static] folder with [build/static/]!"
    cp -rf static ${BUILD_DIR}
    echo "[INFO] Creating symlinks for dynamic content!"
    for xxx in `ls -1 | grep -v "^build$\|^build.sh$\|^${axway_common_name}$\|^static$"`;do
        # takes care of any top level files/folder only in micro site and not in axway-open-docs-common
        if [[ ! -e "${axway_common_name}/${xxx}" ]];then
            #echo "[DEBUG] 1"
            ln ${_ln_opt} $(pwd)/${xxx} ${BUILD_DIR}/${xxx}
        # takes care of all directories and files inside sub folders
        elif [[ -d "${xxx}" ]];then
            for sub_xxx in `diff -qr ${axway_common_name}/$xxx $xxx | grep -v "^Only in ${axway_common_name}[/\|:]"`;do
                _c_context=`echo ${sub_xxx} | awk '{ print $1 }'`
                if [[ "${_c_context}" == "Only" ]];then
                    _c_path=`echo ${sub_xxx} | awk '{ print $3 }' | sed -e "s|:||g"`
                    _c_name=`echo ${sub_xxx} | awk '{ print $4 }'`
                    #echo "[DEBUG] 2"
                    ln ${_ln_opt} $(pwd)/${_c_path}/${_c_name} ${BUILD_DIR}/${_c_path}/${_c_name}
                else
                    _c_path=`echo ${sub_xxx} | awk '{ print $4 }'`
                    #echo "[DEBUG] 3"
                    ln ${_ln_opt} $(pwd)/${_c_path} ${BUILD_DIR}/${_c_path}
                fi
            done
        # takes care of all top level files
        else
            #echo "[DEBUG] 4"
            ln ${_ln_opt} $(pwd)/${xxx} ${BUILD_DIR}/${xxx}
        fi
    done
    echo "[INFO] Following symlinks were created:"
    for xxx in `find $(basename ${BUILD_DIR}) -type l`;do
        echo "[INFO]    |- ${xxx}"
    done
    echo "[INFO]"
    IFS="${IFS_SAVE}"
}

function fRunHugo() {
    cd ${BUILD_DIR}
    mkdir public
    case "${MODE}" in
        "dev") 
            hugo server
            ;;
        "nelify") 
            hugo
            # Moving the "publish" directory to the ROOT of the workspace. Netlify can't publish a
            # different directory even if the "Publish directory" is changed to specify a different directory.
            mv -f ${BUILD_DIR}/public ${PROJECT_DIR}
            ;;
        "nelify-preview") 
            hugo -b $DEPLOY_PRIME_URL
            mv -f ${BUILD_DIR}/public ${PROJECT_DIR}
            ;;
    esac
}

fCheckoutSubmodule
fMergeContent
fRunHugo