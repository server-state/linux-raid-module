# Linux raid module

[![Build Status](https://travis-ci.com/server-state/linux-raid-module.svg?branch=master)](https://travis-ci.com/server-state/linux-raid-module)
![GitHub](https://img.shields.io/github/license/server-state/linux-raid-module)
[![npm version](https://badge.fury.io/js/%40server-state%2Flinux-raid-module.svg)](https://badge.fury.io/js/%40server-state%2Flinux-raid-module)
[![Coverage Status](https://coveralls.io/repos/github/server-state/linux-raid-module/badge.svg?branch=master)](https://coveralls.io/github/server-state/linux-raid-module?branch=master)
![module type: official](https://img.shields.io/badge/module%20type-official-%23015ba0)

This module parses the file /proc/mdstat generated from the Linux raid kernel module and extracts useful information, for example, raid name, current devices with their status, activities.

The `/proc/mdstat` file might look like this:
```
Personalities : [raid1] [raid0] 
md126 : active raid1 sdb20[2](R) sdb2[1] sdb1[0]
      20954112 blocks super 1.2 [2/2] [UU]
      [==============>......]  recovery = 74.4% (15600512/20954112) finish=3.2min speed=27496K/sec
      
unused devices: <none>

```

For it, the parsed JSON output would look like this:
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
This output generates a straight base to provide other applications useful information like server-state example [client-base](https://github.com/server-state/client-base).

This official module belongs to the organization [server-state](https://github.com/server-state).
