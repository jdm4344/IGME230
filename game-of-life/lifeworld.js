const lifeworld = 
{
    //Sets up initial variables for operation
    init(numCols,numRows)
    {
        this.numCols = numCols;
        this.numRows = numRows;
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
    },

    //Sets up a 2D array
    buildArray()
    {
        let outerArray = [];
        for(let row = 0; row < this.numRows; row++)
        {
            let innerArray = [];
            for(let col = 0; col < this.numCols; col++)
            {
                innerArray.push(0);
            }
            outerArray.push(innerArray);
        }
        return outerArray;
    },

    //Fills a random amount of cells throughout the grid
    randomSetup()
    {
        for(let row = 0; row < this.numRows; row++)
        {
            for(let col = 0; col < this.numCols; col++)
            {
                if(Math.random() < .1)
                {
                    this.world[row][col] = 1;
                }
            }
        }
    },

    //Determines active cells in next generation
    getLivingNeighbors(row, col)
    {
        let neighbors = 0;

        if(row > 0 && col > 0)
        {
            //console.log("row > 0 && col > 0");
            if(col < (this.world[row].length - 1) && row < (this.world.length - 1))
            {
                //console.log("Second Loop");
                if(this.world[row][col - 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row][col + 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row - 1][col - 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row + 1][col - 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row - 1][col + 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row + 1][col + 1] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row + 1][col] == 1)
                {
                    neighbors++;
                }
                
                if(this.world[row - 1][col] == 1)
                {
                    neighbors++;
                }

                return neighbors;
            }
            return 0;
        }
        return 0;
    },

    //Checks cells in the grid and determines if they should live or die
    step()
    {
        for(let row = 0; row < this.numRows; row++)
        {
            for(let col = 0; col < this.numCols; col++)
            {
                let num = this.getLivingNeighbors(row, col);

                if(this.world[row][col] == 1)
                {
                    if(num < 2) //Less than 2 neighbors, underpopulation > die
                    {
                        this.worldBuffer[row][col] = 0;
                        continue;
                    }
                    else if(num > 3) //More than 3 neighbors, overpopulation > die
                    {
                        this.worldBuffer[row][col] = 0;
                        continue;
                    }
                    else if(num == 2 || num == 3) //2 or 3 neighbors, stay alive
                    {
                        this.worldBuffer[row][col] = 1;
                        continue;
                    }
                }
                else if(this.world[row][col] == 0 && num == 3) //3 neighbors, reproduction
                {
                    this.worldBuffer[row][col] = 1;
                }
            }
        }
        //Swap arrays
        let worldTemp = this.world;
        this.world = this.worldBuffer;
        this.worldBuffer = this.buildArray();
    },
}