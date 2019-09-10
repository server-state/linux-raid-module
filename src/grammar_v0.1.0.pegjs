// linux-raid-module parser grammar
// Written for PEGJS parser.
// To compile:
// Go to online version: https://pegjs.org/online
// Build parser and download parser code.
// ================================================
// Copyright (C) server-state


// ====== ENTRY POINT ======
start
    = personalities:personalities raids:raid* unused {
        return {
            "personalities": personalities,
            "raids": raids
        };
    }

personalities
    = "Personalities : " personalities:("[" raidType:raidType "] " { return raidType; })* "\n" {
        return personalities;
    }

// ====== RAID DEFINITION ======
raid
    = firstLine:firstLine "\n"
        whitespace secondLine:secondLine "\n"
        options:(whitespace option:optionLine "\n" { return option; })*
        whitespace "\n" {
            return Object.assign(firstLine, secondLine, {"options": options});
    }

// +----- BEGIN: first line -----+
firstLine
    = name:linuxDevice " : " state:state 
    access:(" " access:access { return access; })?
    type:(" " type:raidType { return type; })? 
    devices:(" " device:device { return device; })* {
        return {
            "name": name,
            "state": state,
            "access": (access ? access : "rw"),
            "type": type,
            "devices": devices
        };
    }

state
    = "active" / "inactive"

access
    = "(auto-read-only)" {
        return "ro"
    }

device
    = name:linuxDevice "[" index:integer "]" status:deviceStatus {        
        return {
            "name": name,
            "index": index,
            "status": status
        };
    }

deviceStatus
    = status:("(" identifier:deviceStatusIdentifier ")" { return identifier; })? {
        switch (status) {
            case "F":
                return "failed";
            case "R":
                return "rescue";
            case "S":
                return "spare";
            default:
                return "active";
        }
    }

deviceStatusIdentifier
    = "F" / "S" / "R"
// +----- END: first line -----+

// +----- BEGIN: second line -----+
secondLine
    = blocks:integer " blocks " parameters:$[0-9a-z, .-]i* devicePosition:devicePosition? {
        return Object.assign(
            {
                "blocks": blocks,
                "parameters": parameters.trim()
            },
            devicePosition
        );
    }

devicePosition
    = "[" ideal:integer "/" current:integer "] [" [_,U]* "]" {
        return {
            ideal: ideal,
            "current": current
        };
    }
// +----- END: second line -----+

// +----- BEGIN: option lines -----+
optionLine
    = bitmap / activity / unknown

bitmap
    = "bitmap: " usedPages:integer "/" totalPages:integer " pages [" sizePages:integer "KB], "
        chunkSize:integer "KB chunk" {
        return {
            "type": "bitmap",
            "usedPages": usedPages,
            "totalPages": totalPages,
            "sizePages": sizePages,
            "chunkSize": chunkSize
        };
    }

activity
    = "[" [=]* [>] [.]* "]  " activityType:activityType " =" whitespace progress:float "% "
        "(" processed:integer "/" total:integer ") "
        "finish=" finish:float "min "
        "speed=" speed:integer "K/sec" {
        return {
            "type": "activity",
            "activityType": activityType,
            "progress": progress,
            "processed": processed,
            "total": total,
            "finish": finish,
            "speed": speed
        };
    }

activityType
    = "recovery" / "resync"

unknown
    = value:$[^\n]+ {
        return {
            "type": "unknown",
            "value": value
        };
    }
// +----- END: option lines -----+

// +----- BEGIN: last line -----+
unused
    = "unused devices: " [^\n]* "\n" {
        return null
    }

// +----- END: last line -----+


// ====== BASIC RULES ======
// Sources: https://en.wikipedia.org/wiki/Device_file
//          http://www.tldp.org/HOWTO/Partition-Mass-Storage-Definitions-Naming-HOWTO/x99.html
linuxDevice "linuxDevice"
    = $(prefix integer*)

prefix
    = $(("sd" / "hd") [a-z])
    / "sr"
    / "sg"
    / "st"
    / "md"
    / $("nvme" integer "n" integer "p"*)
    / $("mmcblk" integer "p"*)

raidType
    = $("raid" ("10" / "0" / "1" / "2" / "4" / "5" / "6"))
    / "linear"
    / "multipath"

integer "integer"
    = digits:$[0-9]+ {
        return parseInt(digits, 10);
    }

float "float"
    = digits:$[0-9.]+ {
        return parseFloat(digits, 10);
    }

whitespace "whitespace"
    = [ ]* {
        return null;
    }
