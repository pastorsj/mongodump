set -e
set -u


DB=$1

TIMESTAMP=`date +%F-%H%M`
BACKUP_NAME="$DB-$TIMESTAMP"
MONGODUMP_PATH="/usr/bin/mongodump"

# Create the Dump directory if it does not exist
cd ~
mkdir -p DUMP
cd DUMP
$MONGODUMP_PATH --db $DB --out BACKUP_NAME
