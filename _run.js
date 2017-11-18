var  ARGS       = process.argv.filter(function(s){return false === /node\.exe/i.test(s) && false === /_run\.js/i.test(s)})
    ,path       = require("path")
    ,filename   = path.resolve(   ARGS.shift() || ""   )
    ,command
    ,output
    ,parts      = path.parse(filename)
    ,tmp        = []
    ,filename_output
    ,fs         = require("fs")
    ;


command = 'ffprobe -hide_banner -loglevel "error" -print_format "json=compact=0" -show_chapters -i "##FILENAME##"'.replace(/##FILENAME##/, filename);
output  = require("child_process").execSync(command, {timeout:5000, encoding:"UTF8", windowsHide:true});
output  = JSON.parse(output);


command = 'ffmpeg -y -hide_banner -loglevel "info" -strict "experimental" -ss "##STARTCRUDE##" -i "##FILENAME##" ##FLAGS## -ss "##STARTPRECISE##" -to "##END##" -codec "copy" "##FILENAMEOUTPUT##"'.replace(/##FILENAME##/, filename);
command = command.replace(/##FLAGS##/, '-flags "+naq+low_delay+global_header-unaligned-ilme-cgop-loop-output_corrupt" -flags2 "+fast+ignorecrop+showall+export_mvs" -fflags "+ignidx+genpts+nofillin+discardcorrupt-fastseek" -movflags "+faststart+disable_chpl" -avoid_negative_ts "make_zero" -ignore_unknown -map_chapters "-1"');



output.chapters.forEach(function(item){
  filename_output = (item.tags.title || "Chapter" + " " + item.id).replace(/[^a-z0-9\!\,\.\-\_\ ]/ig, "_");  //sanitized chapter name.
  filename_output = parts.name + " - " + filename_output + parts.ext;                                  //combined with original filename and using same extension.
  filename_output = parts.dir + "/" + filename_output;                                                 //same path as original file.
  filename_output = path.resolve(filename_output);                                                     //fix if needed to make fully qualified.

//require("console").log(item);

  tmp.push(
    command.replace(/##STARTCRUDE##/,       Math.trunc(Number(item.start_time)).toFixed(6))                              //skip ahead fast but not to accurate pin-point (the whole-integer value).
           .replace(/##STARTPRECISE##/,     (Number(item.start_time) - Math.trunc(Number(item.start_time))).toFixed(6))  //pin-point exact true start, relativly to first crude start (the fraction of the original value). Using 'toFixed' is a 'safe way to round' a number so '0.2' won't be 0.1999999999998.
           .replace(/##END##/,              item.end_time)
           .replace(/##FILENAMEOUTPUT##/,   filename_output)
  );
});

tmp = tmp.join("\r\n");
tmp = "@echo off" + "\r\n" + tmp + "\r\n" + "pause" + "\r\n";

filename_output = parts.name + " - chapter_splitter" + ".cmd"                             //just file-name.
filename_output = path.parse(process.mainModule.filename).dir + "/" + filename_output;    //with path to current folder.
filename_output = path.resolve(filename_output);                                          //fix to fully qualified path if needed.

fs.writeFileSync(filename_output, tmp, {flag:"w", encoding:"utf8"}); //overwrite

