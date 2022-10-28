# Generates LAR test files for Annual + all quarters for the given year

if [ -z "$1" ]
then
  echo "[Error] No YEAR provided!"
  echo " Usage: generateAll.sh <YEAR> <# ROWS>?"
  exit 1
fi

ROWS=$2
if [ -z "$ROWS" ]
  then
    ROWS=10
fi

yarn make-lar FRONTENDTESTBANK9999 $1 $ROWS
yarn make-lar FRONTENDTESTBANK9999 $1-Q1 $ROWS
yarn make-lar FRONTENDTESTBANK9999 $1-Q2 $ROWS
yarn make-lar FRONTENDTESTBANK9999 $1-Q3 $ROWS