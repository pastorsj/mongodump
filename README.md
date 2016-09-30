# mongodump
A simple script execute a cron job to dump your localhost mongodb

## Required
config.json
``` json
{
    "db": "DB_NAME",
    "hour": 3 (default),
    "minute": 0 (default)
}
```

Make it executable:

```
chmod +x mongdb.sh
```

Schedule a Cronjob:

```
sudo su
crontab -e
```

Enter this in a new line:

```
# Everyday at 3 a.m.
00 03 * * * /bin/bash mongodb.sh [NAME_OF_DB]
```