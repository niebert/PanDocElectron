% Create Reveal Presentation
% Name: Engelbert Niehaus
% Date: April 10th, 2016


Folders & Organisation
----------------------

The list describes the purpose of these folders and 
provides a small survey about the files that are stored in these folders:

* <b>reveal:</b> Presentation Libraries (<https://github.com/hakimel/reveal.js>).
* <b>mathjax:</b> Render Mathemematical Formulas (<https://github.com/mathjax/MathJax>).
* <b>mypresentation:</b> Media files for the reveal presentation "mypresentation.html"


Folder reveal:
-------------

* Contains all the files that allows the use of all features of the reveal
project. 
* The libraries created by Hakim El Hattab are embedded in all the reveal 
presentations. 
* The content of the "reveal" folder can be replaces by newer versions
of "reveal.js" 
* URL: <https://github.com/hakimel/reveal.js>

Folder  mathjax: 
----------------

* In standard [reveal.js](https://github.com/hakimel/reveal.js) presentations mathematical formulas are rendered 
with MathJax by importing the MathJax libraries via internet access. 
* This has the disadvantage that mathematical formulas are not rendered, when you 
do not have internet connectivity or the MathJax libraries are removed from the
browser cache. 
* The local MathJax libraries avoid these problems.
The content of the "mathjax" folder can be replaces by newer versions
of "MathJax" 
* URL: <https://github.com/mathjax/MathJax> 
* Homepage: <http://www.mathjax.org>

Mathemtatics:
-------------
* Taylor Series $f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n$   
Separate Math Form
$$ \displaystyle  \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right) $$

Folder Audio Video:
----------------------
* if you use medis files create a subdirectory in the project directory call _media/_ with the 
  subfolders _media/audio_, _media/video_ and _media/images_
* thes folders contain all media files (Video, Audio, Images, ...) that are used in the reveal presentation
  or other PanDoc export formats.

Commands for MarkDown
---------------------

* The file *README_pres.txt* is e.g. a text file in MarkDown and converted into Reveal.
* The following PanDoc command creates a reveal presentation from Markdown.

```
pandoc -t html5 --template=tpl4reveal.html \
      --standalone --section-divs \
      --variable theme="beige" \
      --variable transition="slide" \
      slides.md -o slides.html
```

Commands for WikiMedia
----------------------

* Source Files from Wikipedia (e.g. Edit Article) can be retrieved and stored as text file.
* The following PanDoc command creates a reveal presentation from the Wikipedia file _"wikipedia.wiki"_.

```
pandoc -f mediawiki -t html5 --template=tpl4reveal.html \
     --standalone --section-divs \
     --variable theme="beige" \
     --variable transition="slide" --mathjax \
     wikipedia.wiki -o wikipedia.html 
```

Learning Markdown & WikiMedia
-----------------------------

* Learning Markdown <http://www.markdowntutorial.com>
* Learning WikiMedia <https://en.wikipedia.org/wiki/Wikipedia:Tutorial>
