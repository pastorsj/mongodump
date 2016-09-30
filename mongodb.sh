set -e
set -u


DB=$1
FILENAME=$2

echo "DB $DB"
echo "FILENAME $FILENAME"
echo "LOCATION $LOCATION"

# Create the Dump directory if it does not exist
cd ~
mkdir -p MONGO_DUMP
cd MONGO_DUMP
mongodump --db $DB --out $FILENAME
cd ~
echo "Dumped DB!"
