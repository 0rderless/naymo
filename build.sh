#!/bin/sh
# Rebuilds index.html from the source parts in src/ (order matters).
cd "$(dirname "$0")/src" && cat 1_head.html 2_core.js 3a_scenes_old.js 3b_scenes_new.js 4_comments_feed.js 5_pages.js 6_story_live.js 6b_live.js 6c_extra.js 6d_more.js 7_tools_init.js > ../index.html
