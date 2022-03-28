#!/bin/bash

set -e
rm -rf ./node_modules && lerna clean && lerna bootstrap