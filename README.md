<h1><em>Chapter Splitter</em> - &nbsp; &nbsp; <a href="https://paypal.me/e1adkarak0"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Donation"></a></h1>

Video chapters are a nice way to identify a start/end of new contextual-segments in a long-video.<br/>

In case you've used of a ripping program such as <a href="https://handbrake.fr/nightly.php"><img src="handbrake.png"/> HandBrake</a>,<br/>
you'll end up with a one long video, containing all the videos on the DVD,<br/>
if it is not desirable for you, you may use this <em>Chapter Splitter</em> to split the one long video into many short ones,<br/>
accurately cut by the chapter's start and end points.

<img src="resources/chapters_example.png"/>

<em>Chapter Splitter</em> uses FFPROBE for the chapter information, in a JSON format,<br/>
feeded into the NodeJS engine to render a long-list of FFMPEG commands,<br/>
that will split the long video, but will not re-encode it (<em>muxing</em>),<br/>
this should end up very fast, and playable in most devices - and with the same quality!<br/>

<em>It is advisable that you'll <a href="https://github.com/eladkarako/ffmpeg/">re-encode the video</a> at some point or upload it to YouTube, (which will do it itself) in-order to fix the video-index.</em>


<hr/>

<h3>How To Use?</h3>

<img src="resources/action_description1.png"/>

You'll drag&amp;drop your media over <code>_run.cmd</code> and it will generate a new CMD file,<br/>
run it and all the work will be done for you.<br/>

<img src="resources/action_description2.png"/>

When you'll run the CMD file,<br/>
the new videos will be placed in the same folder as the original video,<br/>
their names will be the original file name with a suffix of the chapter name (or "Chapter " with the chapter id in-case title is not available).<br/>


No encoding is actually done in <em>Chapter Splitter</em>,<br/>
you can run the generated CMD file when you'll want to.<br/>

<hr/>

In order to provide a complete solution (with binaries included),<br/>
I've <a href="https://upx.github.io">UPX</a>-compressed the exe files.<br/>
FFMPEG are about 40MB but now are about 14MB (and nodejs goes from about 20MB to 5MB).<br/>
Some antivirus programs do not like upx, I think it's cool.<br/>

<hr/>

<h3>Updating?</h3>
FFMPEG/FFPROBE can be downloaded from here:<br/>
<a href="https://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-latest-win32-static.zip">https://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-latest-win32-static.zip</a> or <br/> 
here: <a href="https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip">https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip</a><br/>

NodeJS can be downloaded from here:<br/>
<a href="https://nodejs.org/download/nightly/v10.0.0-nightly20171117959c425a19/win-x86/node.exe">https://nodejs.org/download/nightly/v10.0.0-nightly20171117959c425a19/win-x86/node.exe</a><br/>
for x64 bit get the <code>node.exe</code> from the <code>win-x64/</code> folder instead.<br/>
And browse <a href="https://nodejs.org/download/nightly/">https://nodejs.org/download/nightly/</a> for a more recent builds.<br/>
