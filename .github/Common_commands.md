# Common Commands

## First time

git clone https://github.com/BKOmega/BKOmega.github.io.git
cd BKOmega.github.io
git checkout -b dev        # create dev once if it doesn’t exist
git push -u origin dev

## Daily work


git checkout dev
git pull

### ...edit files...

## test

bundle exec jekyll serve --livereload

## commit and push

git checkout dev || git checkout -b dev  # switch to dev, create if missing
git pull

### ...edit files


git add -A
git commit -m "Post: homelab network design (draft)"
git push

## Publish

on GitHub: Open PR from dev → main, review, squash-merge.
Pages auto-updates from main/docs.


<<<<<<< HEAD
bundle exec jekyll serve --source docs

on GitHub: Open PR from dev → main, review, squash-merge
Pages auto-updates from main/docs

=======
bundle exec jekyll serve --source docs
>>>>>>> 27da980 (Enable Jekyll serve command and add pull request trigger for GitHub Actions)
