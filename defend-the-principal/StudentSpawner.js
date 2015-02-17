var StudentSpawner = function (posX, posY, students, level, offices, officeGenerator) {
    this.officeGenerator = officeGenerator;
    this.lvlUpFlag = 500;
    this.level = level;
    this.offices = offices;

    this.students = students;
    this.spawnX = posX;
    this.spawnY = posY;

    this.maxTime = 600; // 600
    this.minTime = 400; // 400

    this.time = 0;

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
    this.time++;
    if (this.time == this.lvlUpFlag) {
        console.log('ding! ' + this.time);
        this.lvlUpFlag *= 2;

        this.maxTime *= .8;
        this.minTime *= .8;

        Student.prototype.properties.problem.min *= 1.2;
        Student.prototype.properties.problem.max *= 1.2;

        this.officeGenerator.totalSpawnCooldown *= .95;
    }

    if (this.spawnCooldown <= 0) {
        if (!this.isSpawnPointBlocked()) {
            // a random number between [this.maxTime, this.minTime]
            this.spawnCooldown = Math.round(Math.random() * (this.maxTime - this.minTime) + this.minTime);
            this.spawn();
        }
    }

    this.spawnCooldown--;
};
