// -1 outside
// 0 empty
// 1 wall
// 11 player

// Define a class called DungeonGenerator
class DungeonGenerator {
    // Initialize default values for width, height, roomWidth, roomHeight, roomsNumber, dungeon, and map
    width = 1;
    height = 1;
    roomWidth = 5;
    roomHeight = 5;
    roomsNumber = 1;
    dungeon = [];
    map = [];

    // Constructor function that takes roomWidth, roomHeight, and roomsNumber as parameters
    constructor(roomWidth, roomHeight, roomsNumber) {
        // Set the width and height of the dungeon based on the number of rooms
        this.width = this.calculateSize(roomsNumber);
        this.height = this.calculateSize(roomsNumber);
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.roomsNumber = roomsNumber;

        // Call the createDungeon() function to initialize the dungeon array
        this.createDungeon();
    }

    // Function to create the dungeon array filled with zeros
    createDungeon() {
        for (var i = 0; i < this.height; i++) {
            var row = [];
            for (var j = 0; j < this.width; j++) {
                row.push(0);
            }
            this.dungeon.push(row);
        }
    }

    // Function to set the player in the middle of the room
    setPlayer(room) {
        var middle = DungeonGenerator.getMiddleOfMap(room.map);
        room.map[middle.y][middle.x] = 11;
    }

    // Function to generate the dungeon
    generateDungeon() {
        // Create a new room object
        var room = new Room(this.roomWidth, this.roomHeight);

        // Calculate the center coordinates of the dungeon
        var x = Math.floor(this.width / 2);
        var y = Math.floor(this.height / 2);

        // Set the center of the dungeon as the starting room
        this.dungeon[y][x] = room;

        // Set the player in the starting room
        this.setPlayer(room);

        // Call the createRooms() function to generate additional rooms
        this.createRooms(room);

        // Generate the map based on the dungeon layout
        this.map = this.generateMap();
    }

    // Function to create additional rooms in the dungeon
    createRooms(firstRoom) {
        // Create a stack to keep track of rooms
        var stack = [];
        stack.push({ room: firstRoom, x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) });

        // Keep track of the number of rooms created
        var roomsNumberCount = 0;

        // Loop until the desired number of rooms is reached
        while (roomsNumberCount < this.roomsNumber - 1) {
            // Pop the top room from the stack
            var current = stack.pop();

            // Get the empty neighbors of the current room
            var emptyNeighbours = this.getEmptyNeighbours(current.x, current.y);

            // If there are empty neighbors, create a new room and add it to the dungeon
            if (emptyNeighbours.length > 0) {
                stack.push(current);

                // Select a random empty neighbor
                var randomIndex = Math.floor(Math.random() * emptyNeighbours.length);
                var randomNeighbour = emptyNeighbours[randomIndex];

                // Create a new room with a door connecting it to the current room
                var newRoom = current.room.createDoorAndNewRoom(randomNeighbour.direction);
                this.dungeon[randomNeighbour.y][randomNeighbour.x] = newRoom;

                // Push the new room to the stack
                stack.push({ room: newRoom, x: randomNeighbour.x, y: randomNeighbour.y });

                // Increment the room count
                roomsNumberCount++;
            }
        }
    }

    // Function to get the empty neighbors of a given position in the dungeon
    getEmptyNeighbours(x, y) {
        var neighbours = [];

        // Check if the neighbor above is empty
        if (this.dungeon[y - 1][x] == 0) {
            neighbours.push({ x: x, y: y - 1, direction: 8 });
        }

        // Check if the neighbor below is empty
        if (this.dungeon[y + 1][x] == 0) {
            neighbours.push({ x: x, y: y + 1, direction: 2 });
        }

        // Check if the neighbor to the left is empty
        if (this.dungeon[y][x - 1] == 0) {
            neighbours.push({ x: x - 1, y: y, direction: 4 });
        }

        // Check if the neighbor to the right is empty
        if (this.dungeon[y][x + 1] == 0) {
            neighbours.push({ x: x + 1, y: y, direction: 6 });
        }

        return neighbours;
    }

    // Function to generate the map based on the dungeon layout
    generateMap() {
        var map = [];

        // Create an empty map array
        for (var i = 0; i < this.height * this.roomHeight; i++) {
            var row = [];
            for (var j = 0; j < this.width * this.roomWidth; j++) {
                row.push(-1);
            }
            map.push(row);
        }

        // Copy the room maps to the map array
        for (var i = 0; i < this.dungeon.length; i++) {
            for (var j = 0; j < this.dungeon[i].length; j++) {
                if (this.dungeon[i][j] != 0) {
                    var room = this.dungeon[i][j];
                    for (var k = 0; k < room.map.length; k++) {
                        for (var l = 0; l < room.map[k].length; l++) {
                            map[i * this.roomHeight + k][j * this.roomWidth + l] = room.map[k][l];
                        }
                    }
                }
            }
        }

        return map;
    }

    // Function to calculate the size of the dungeon based on the number of rooms
    calculateSize(n) {
        return 2 * n - 1;
    }

    // Function to get the middle coordinates of the map
    static getMiddleOfMap(map) {
        var middleX = Math.floor(map[0].length / 2);
        var middleY = Math.floor(map.length / 2);
        return { x: middleX, y: middleY };
    }
}

// Define a class called Room
class Room {
    // Initialize default values for width, height, and map
    width = 0;
    height = 0;
    map = [];

    // Constructor function that takes width and height as parameters
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Create a map array for the room
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                if (i == 0 || i == height - 1) {
                    row.push(1);
                } else if (j == 0 || j == width - 1) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            this.map.push(row);
        }
    }

    // Function to create a door in the room at a given direction
    createDoor(direction) {
        var middle = DungeonGenerator.getMiddleOfMap(this.map);

        switch (direction) {
            case 8:
                this.map[0][middle.x] = 0;
                break;
            case 6:
                this.map[middle.y][this.map[0].length - 1] = 0;
                break;
            case 2:
                this.map[this.map.length - 1][middle.x] = 0;
                break;
            case 4:
                this.map[middle.y][0] = 0;
                break;
        }
    }

    // Function to create a door and a new room connected to the current room
    createDoorAndNewRoom(direction) {
        this.createDoor(direction);

        // Create a new room with the same dimensions as the current room
        var newRoom = new Room(this.width, this.height);

        // Create a door in the new room opposite to the direction of the current room
        newRoom.createDoor(this.getOppositeDirection(direction));

        return newRoom;
    }

    // Function to get the opposite direction of a given direction
    getOppositeDirection(direction) {
        switch (direction) {
            case 8:
                return 2;
            case 6:
                return 4;
            case 2:
                return 8;
            case 4:
                return 6;
        }
    }
}