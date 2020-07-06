#!/bin/bash

cwd=$(pwd)
cd ~/

echo 'Clone/update the git-secrets'
if [ ! -d git-secrets ]; then
  git clone -q https://github.com/awslabs/git-secrets.git
fi

cd git-secrets
git fetch -q origin
git fetch -q --tags origin
git checkout -q $(git tag | tail -n 1)

echo 'Install git-secrets'
sudo make install
if [ "$?" -ne "0" ]; then
  echo 'Unable to sudo. Either the provided password is incorrect or the installation failed'
  cd "${cwd}"
  exit 1
fi

echo 'Registering git-secrets as a global option'
git secrets --register-aws --global
mkdir -p ~/.git-templates/git-secrets
git secrets --install -f ~/.git-templates/git-secrets &>/dev/null
git config --global init.templateDir ~/.git-templates/git-secrets

cd "${cwd}"

echo 'Install the git hooks to use with git-secrets' 
if [ -d .git ]; then
  git secrets --register-aws
  git secrets --install &>/dev/null
else
  echo "$(pwd) is not a Git repository. Not applying git-secrets checks here"
fi
echo 'Success!' 
