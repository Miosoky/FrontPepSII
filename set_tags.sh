BRANCH="master"

# Are we on the right branch?
if [ "$TRAVIS_BRANCH" = "$BRANCH" ]; then
  
  # Is this not a Pull Request?
  if [ "$TRAVIS_PULL_REQUEST" = false ]; then
    
    # Is this not a build which was triggered by setting a new tag?
    if [ -z "$TRAVIS_TAG" ]; then
      echo -e "Starting to tag commit.\n"

      git config --global user.email "pit.gaultier@free.fr"
      git config --global user.name "P1erreGaultier"

      # Add tag and push to master.
      git tag -a v${TRAVIS_BUILD_NUMBER} -m "Travis build $TRAVIS_BUILD_NUMBER pushed a tag."
      git push origin --tags
      git fetch origin
  fi
  fi
fi
