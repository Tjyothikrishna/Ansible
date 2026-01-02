#!/bin/bash
echo "Hostname: $(hostname)" >> /tmp/user.txt
echo "Current Date: $(date)" >> /tmp/user.txt
echo "uptime: `uptime` ">> /tmp/user.txt
#End