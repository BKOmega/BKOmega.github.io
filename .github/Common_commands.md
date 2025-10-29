# Common Commands

## First time

<<<<<<< HEAD
git clone https://github.com/BKOmega/BKOmega.github.io.git
=======
git clone <https://github.com/BKOmega/BKOmega.github.io.git>
>>>>>>> 3469346 (annonomising before initial push to main)
cd BKOmega.github.io
git checkout -b dev        # create dev once if it doesn’t exist
git push -u origin dev

## Daily work

<<<<<<< HEAD
git checkout dev
git pull

### ...edit files...

## test

bundle exec jekyll serve --livereload

## commit and push
=======
git checkout dev || git checkout -b dev  # switch to dev, create if missing
git pull

### ...edit files
>>>>>>> 3469346 (annonomising before initial push to main)

git add -A
git commit -m "Post: homelab network design (draft)"
git push

## Publish

<<<<<<< HEAD
on GitHub: Open PR from dev → main, review, squash-merge.
Pages auto-updates from main/docs.


bundle exec jekyll serve --source docs
=======
on GitHub: Open PR from dev → main, review, squash-merge
Pages auto-updates from main/docs
>>>>>>> 3469346 (annonomising before initial push to main)
