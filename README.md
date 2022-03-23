# [Typestate Editor](https://typestate-editor.github.io/)

Development of software is an iterative process. Graphical tools to represent the relevant entities and processes can be helpful.
In particular, **automata** capture well the intended execution flow of applications, and are thus behind many formal approaches, namely **behavioral types**.

**Typestate-oriented programming** allow us to model and validate the intended protocol of applications, not only providing a top-down approach to the development of software, but also coping well with compositional development.
Moreover, it provides important static guarantees like protocol fidelity and some forms of progress.

[Mungo](http://www.dcs.gla.ac.uk/research/mungo/index.html) is a front-end tool for Java that associates a **typestate** describing the valid orders of method calls to each class, and statically checks that the code of all classes follows the prescribed order of method calls.

To assist programming with Mungo, as typestates are textual descriptions that are terms of an elaborate grammar, we developed a tool that **bidirectionally converts typestates into an adequate form of automata**, providing on one direction a visualization of the underlying protocol specified by the typestate, and on the reverse direction a way to get a syntactically correct typestate from the more intuitive automata representation.

## Features

- **Preview**: Create a graphical automaton from a typestate and download the PNG image;
- **Typestate → AST**: Parse the typestate into an AST;
- **AST → Automaton**: Transform an AST of a typestate into a JSON representation of an automaton;
- **Automaton → AST**: Transform a JSON representation of an automaton into an AST of a typestate;
- **AST → Typestate**: Generate the typestate from an AST.

The tool also brings examples that you can experiment with: just select one from the `Examples` menu and it will be copied to your clipboard!

## Resources

[Paper: "Typestates to Automata and back: a tool"](https://arxiv.org/abs/2009.08769)

[Video Presentation to ICE 2020](https://www.youtube.com/watch?v=GCSPPtOgZqw)

BibTeX reference of the paper:

```
@inproceedings{DBLP:journals/corr/abs-2009-08769,
  author    = {Andr{\'{e}} Trindade and
               Jo{\~{a}}o Mota and
               Ant{\'{o}}nio Ravara},
  title     = {Typestates to Automata and back: a tool},
  booktitle = {Proceedings 13th Interaction and Concurrency Experience, {ICE} 2020,
               Online, 19 June 2020},
  series    = {{EPTCS}},
  volume    = {324},
  pages     = {25--42},
  year      = {2020},
  doi       = {10.4204/EPTCS.324.4}
}
```
