
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git add assets/data/*.json
  git commit --message "[ci skip] Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote remove origin
  git remote add origin https://${GH_TOKEN}@github.com/codeclubtbms/codeclubtbms.github.io.git
  git push origin HEAD:master
}

setup_git
commit_website_files
upload_files
