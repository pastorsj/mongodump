set -e
set -u


DB=$1
FILENAME=$2

# Create the Dump directory if it does not exist
cd ~
mkdir -p mongodump
cd mongodump
mongodump --db $DB --out $FILENAME
cd ..
echo "Dumped DB!"
