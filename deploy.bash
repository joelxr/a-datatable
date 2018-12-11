#!/usr/bin/env bash
set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

cd _site

git init
git config user.name "Joel Rocha"
git config user.email "joelxr@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/joelxr/a-datatable.git"
git fetch upstream
git reset upstream/gh-pages

echo "joelxr.github.io/a-datatable/" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
