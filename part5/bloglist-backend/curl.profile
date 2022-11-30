#!/bin/bash
# Copyright (c) 2022 4ndrs <andres.degozaru@gmail.com>
# SPDX-License-Identifier: MIT

# This file is meant to be sourced: source ./curl.profile
# functions will then be available directly in the terminal
# as commands

ENDPOINT=http://localhost:3001/api/blogs
PRETTIFY=('python' '-m' 'json.tool')

#######################################
# Gets all the blogs in the current server
# if an argument is supplied, it will then be
# used as the ID to get a single blog
# Arguments:
#   ID of the blog to get
#######################################
blogs_get() {
    if [[ $# -eq 0 ]]; then
        curl -v $ENDPOINT | ${PRETTIFY[@]}
        return
    fi

    curl -v $ENDPOINT/$1 | ${PRETTIFY[@]}
}

#######################################
# Deletes a blog from the current server
# Arguments:
#       ID of the blog to delete
#######################################
blogs_delete() {
    if [[ $# -eq 0 ]]; then
        echo 'An id is needed to send the delete request'
        return
    fi

    curl -vX DELETE $ENDPOINT/$1
    echo "\n"
}

#######################################
# Posts a new blog to the server
#
# Use with heredoc:
#
# blogs_post << EOF
# {
#   "title": "The Title",
#   "author": "The Author",
#   "url": "the.url",
#   "likes": 0
# }
# EOF
#######################################
blogs_post() {
    read -d '' json
    curl -v $ENDPOINT --json $json
    echo "\n"
}

#######################################
# Puts to a blog in the server
# Usage is similar to blogs_post, but
# needs the blog's ID
#
# blogs_post ID << EOF
# {
#   "title": "The Title",
#   "author": "The Author",
#   "url": "the.url",
#   "likes": 0
# }
# EOF
#
# Arguments:
#       ID of the blog to put
#######################################
blogs_put() {
    if [[ $# -eq 0 ]]; then
        echo 'An id is needed to send the put request'
        return
    fi

    read -d '' json
    curl -vX PUT $ENDPOINT/$1 --json $json
    echo "\n"
}
