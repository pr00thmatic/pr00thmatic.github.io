var StudentSpawner = function (posX, posY, students, level, offices) {
    this.level = level;
    this.offices = offices;

    this.students = students;
    this.spawnX = posX;
    this.spawnY = posY;

    this.maxTime = 50;
    this.minTime = 0;

    this.spawnCooldown = 0;
};

StudentSpawner.prototype.spawn = function () {
    var student = new Student(this.level, this.offices, this.students);
    student.spawn(this.spawnX, this.spawnY);
    this.students.push(student);
};

StudentSpawner.prototype.isSpawnPointBlocked = function () {
    var i, dx, dy;

    for (i = this.students.length - 1; i >= 0; i--) {
        if (this.students[i].sprite.alive) {
            dx = Math.abs(this.students[i].sprite.x - this.spawnX);
            dy = Math.abs(this.students[i].sprite.y - this.spawnY);

            if (dy <= 16 && dx < 50) {
                return true;
            }
        }
    }

    return false;
};

StudentSpawner.prototype.update = function () {
    if (this.spawnCooldown <= 0) {
        if (!this.isSpawnPointBlocked()) {
            // a random number between [this.maxTime, this.minTime]
            this.spawnCooldown = Math.round(Math.random() * (this.maxTime - this.minTime) + this.minTime);
            this.spawn();
        }
    }

    this.spawnCooldown--;
};
