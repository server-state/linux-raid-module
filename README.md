# Linux raid module

[![Build Status](https://travis-ci.com/server-state/linux-raid-module.svg?branch=master)](https://travis-ci.com/server-state/linux-raid-module)
![GitHub](https://img.shields.io/github/license/server-state/linux-raid-module)
![module type: official](https://img.shields.io/badge/module%20type-official-%23015ba0)
![npm (scoped)](https://img.shields.io/npm/v/@server-state/linux-raid-module)

This module parse the file /proc/mdstat generated from the linux raid kernel module and extract useful information for example raidname, current devices with their status, activities, etc.

This is how a /proc/mdstat could look like:
```
Personalities : [raid1] [raid0] 
md126 : active raid1 sdb20[2](R) sdb2[1] sdb1[0]
      20954112 blocks super 1.2 [2/2] [UU]
      [==============>......]  recovery = 74.4% (15600512/20954112) finish=3.2min speed=27496K/sec
      
unused devices: <none>

```

And this is the parsed JSON output:
```json
{
   "personalities": [
      "raid1",
      "raid0"
   ],
   "raids": [
      {
         "name": "md126",
         "state": "active",
         "access": "rw",
         "type": "raid1",
         "unique": "myRaid",
         "devices": [
            {
               "name": "sdb20",
               "index": 2,
               "status": "rescue"
            },
            {
               "name": "sdb2",
               "index": 1,
               "status": "active"
            },
            {
               "name": "sdb1",
               "index": 0,
               "status": "active"
            }
         ],
         "blocks": 20954112,
         "parameters": "super 1.2",
         "ideal": 2,
         "current": 2,
         "options": [
            {
               "type": "activity",
               "activityType": "recovery",
               "progress": 74.4,
               "processed": 15600512,
               "total": 20954112,
               "finish": 3.2,
               "speed": 27496
            }
         ]
      }
   ]
}
```
This output generates a straight base to provide other applications useful information like server-states example [client-base](https://github.com/server-state/client-base).

The official module belongs to the organization [server-state](https://github.com/server-state).
