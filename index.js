#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program.version('1.0.0').description('File Utility Tool');

// Copy command
program
  .command('copy <source> <destination>')
  .description('Copy a file from the source path to the destination path')
  .action((source, destination) => {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);

    const sourceStream = fs.createReadStream(sourcePath);
    const destinationStream = fs.createWriteStream(destinationPath);

    sourceStream.pipe(destinationStream);

    sourceStream.on('end', () => {
      console.log(`File copied from ${sourcePath} to ${destinationPath}`);
    });

    sourceStream.on('error', (err) => {
      console.error('Error copying file:', err.message);
    });
  });

// Move command
program
  .command('move <source> <destination>')
  .description('Move a file from the source path to the destination path')
  .action((source, destination) => {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error('Error moving file:', err.message);
      } else {
        console.log(`File moved from ${sourcePath} to ${destinationPath}`);
      }
    });
  });

// Delete command
program
  .command('delete <file>')
  .description('Delete a file')
  .action((file) => {
    const filePath = path.resolve(file);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err.message);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  });

program.parse(process.argv);
