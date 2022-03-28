#!/bin/bash

set -e
rm -rf ./packages/*/node_modules ./node_modules && lerna bootstrap