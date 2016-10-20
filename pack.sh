
#!/bin/sh

# echo "$*";

cd build_scripts

if [ "$1" == "nodebug" ];then
    npm run prod
else
    npm --pack_project="$*" run dev
fi
