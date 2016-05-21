% Simple Example Paper with MarkDown 

-------------------- 	-------------------------  -------------------------------- 
      Miller, Peter 	   miller@uni-landau.de     University of Koblenz\-Landau
       Stone, Maria	       stuart@pandoc.uni        PanDoc University
         Rock, Anna        rock@pandoc.uni          PanDoc University
--------------------   -------------------------  -------------------------------- 



__Abstract__

> This is my abstract. The following text uses the Markdown example  
> provided on [http://www.unexpected-vortices.com](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html).
> For further explanation see [PanDoc-Homepage](http://www.pandoc.org)
> or [Try Pandoc](http://pandoc.org/try/) by John MacFarlane.

An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺


Citation with MarkDown
----------------------
You can cite a book or paper [see @trypandoc] Try PanDoc or
[@item3, pp.345].

Blah blah [see @item1, pp. 33-35; also @item3, ch. 1].

Blah blah [@trypandoc, pp. 33-35, 38-39 contains all the pandoc details].

Blah blah [@trypandoc; @item2].

The `@bibID` is the ID in the BibTex-File that is used normally at  with
`\cite{bibID}` or `\citep{bibID}`.


## Shell Script to Convert MarkDown to ODT ##

If you want to convert MarkDown to ODT use the following call: 

> `sh md2odt.sh paper.md tpl4twocolumn.odt literature.bib`

This script processes the files with pandoc.

**File Type**  **Filename**
-------------  -------------------------------         
Input File:    `paper.md`
Output File:   `paper.odt`
Template:      `tpl4twocolumn.odt`
BibTeX-File:   `literature.bib`
-------------  -------------------------------


An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    `# Let me re-iterate ... `
    `for i in 1 .. 10 { do-something(i) } ` 

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~

### An h3 header ###

Now a nested list[^2] will be created.

[^2]: Footnote for nested enumeration and bullet points

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

--------  ------------  ------------
**size**  **material**   **color**
--------  ------------  ------------
9         leather       brown
10        hemp canvas   natural
11        glass         transparent
--------  ------------  ------------

Table: Shoes, their sizes, and what they're made of

The next table is a grid table (Pandoc extension `+grid_tables` ) 

+---------------+---------------+--------------------+
| Fruit         | Price         |    Advantages      |
+===============+===============+====================+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it's
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](example-image.png "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.on systems where LaTeX, ConTeXt, or `wkhtmltopdf` is installed.

References
----------

