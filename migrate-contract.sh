#!/bin/bash

echo "--------------------------------------"
echo "Migrate contract to shasta..."
echo "--------------------------------------"

source .env.shasta && tronbox migrate --reset --network shasta

echo "--------------------------------------"
echo "Completed."
echo "--------------------------------------"

read -rsn1