'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Caml_obj                = require("bs-platform/lib/js/caml_obj.js");
var Benchmark               = require("benchmark");
var Caml_exceptions         = require("bs-platform/lib/js/caml_exceptions.js");
var CamlinternalLazy        = require("bs-platform/lib/js/camlinternalLazy.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function $neg$neg(i, j) {
  var r = [i];
  return (function () {
      if (r[0] > j) {
        return /* None */0;
      } else {
        var x = r[0];
        r[0] = r[0] + 1 | 0;
        return /* Some */[x];
      }
    });
}

function map(f, g, _) {
  var match = Curry._1(g, /* () */0);
  if (match) {
    return /* Some */[Curry._1(f, match[0])];
  } else {
    return /* None */0;
  }
}

function filter(f, g, _param) {
  while(true) {
    var match = Curry._1(g, /* () */0);
    if (match) {
      var x = match[0];
      if (Curry._1(f, x)) {
        return /* Some */[x];
      } else {
        _param = /* () */0;
        continue ;
        
      }
    } else {
      return /* None */0;
    }
  };
}

function flat_map(f, g) {
  var state = [/* Start */0];
  var aux = function (_param) {
    while(true) {
      var match = state[0];
      if (typeof match === "number") {
        if (match !== 0) {
          return /* None */0;
        } else {
          next_gen(/* () */0);
          _param = /* () */0;
          continue ;
          
        }
      } else {
        var res = Curry._1(match[0], /* () */0);
        if (res) {
          return res;
        } else {
          next_gen(/* () */0);
          _param = /* () */0;
          continue ;
          
        }
      }
    };
  };
  var next_gen = function () {
    var exit = 0;
    var val;
    try {
      val = Curry._1(g, /* () */0);
      exit = 1;
    }
    catch (e){
      state[0] = /* Stop */1;
      throw e;
    }
    if (exit === 1) {
      if (val) {
        state[0] = /* Cur */[Curry._1(f, val[0])];
        return /* () */0;
      } else {
        state[0] = /* Stop */1;
        return /* () */0;
      }
    }
    
  };
  return aux;
}

function fold(f, _acc, g) {
  while(true) {
    var acc = _acc;
    var match = Curry._1(g, /* () */0);
    if (match) {
      _acc = Curry._2(f, acc, match[0]);
      continue ;
      
    } else {
      return acc;
    }
  };
}

var G = /* module */[
  /* -- */$neg$neg,
  /* map */map,
  /* filter */filter,
  /* flat_map */flat_map,
  /* fold */fold
];

var End = Caml_exceptions.create("C_cube_iterators.G_exn.End");

function $neg$neg$1(i, j) {
  var r = [i];
  return (function () {
      if (r[0] > j) {
        throw End;
      } else {
        var x = r[0];
        r[0] = r[0] + 1 | 0;
        return x;
      }
    });
}

function map$1(f, g, _) {
  return Curry._1(f, Curry._1(g, /* () */0));
}

function filter$1(f, g, _param) {
  while(true) {
    var x = Curry._1(g, /* () */0);
    if (Curry._1(f, x)) {
      return x;
    } else {
      _param = /* () */0;
      continue ;
      
    }
  };
}

function flat_map$1(f, g) {
  var state = [/* Start */0];
  var aux = function (_param) {
    while(true) {
      var match = state[0];
      if (typeof match === "number") {
        if (match !== 0) {
          throw End;
        } else {
          next_gen(/* () */0);
          _param = /* () */0;
          continue ;
          
        }
      } else {
        try {
          return Curry._1(match[0], /* () */0);
        }
        catch (exn){
          if (exn === End) {
            next_gen(/* () */0);
            _param = /* () */0;
            continue ;
            
          } else {
            throw exn;
          }
        }
      }
    };
  };
  var next_gen = function () {
    var exit = 0;
    var x;
    try {
      x = Curry._1(g, /* () */0);
      exit = 1;
    }
    catch (e){
      state[0] = /* Stop */1;
      throw e;
    }
    if (exit === 1) {
      state[0] = /* Cur */[Curry._1(f, x)];
      return /* () */0;
    }
    
  };
  return aux;
}

function fold$1(f, _acc, g) {
  while(true) {
    var acc = _acc;
    var exit = 0;
    var x;
    try {
      x = Curry._1(g, /* () */0);
      exit = 1;
    }
    catch (exn){
      if (exn === End) {
        return acc;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      _acc = Curry._2(f, acc, x);
      continue ;
      
    }
    
  };
}

var G_exn = /* module */[
  /* End */End,
  /* -- */$neg$neg$1,
  /* map */map$1,
  /* filter */filter$1,
  /* flat_map */flat_map$1,
  /* fold */fold$1
];

var empty_001 = /* record */[/* unfold */(function (_, on_done, _$1, _$2) {
      return Curry._1(on_done, /* () */0);
    })];

var empty = /* CPS */[
  /* () */0,
  empty_001
];

function $$return(x) {
  return /* CPS */[
          /* () */0,
          /* record */[/* unfold */(function (_, _$1, _$2, on_yield) {
                return Curry._2(on_yield, /* () */0, x);
              })]
        ];
}

function map$2(f, param) {
  var u = param[1];
  return /* CPS */[
          param[0],
          /* record */[/* unfold */(function (st, on_done, on_skip, on_yield) {
                return Curry._4(u[/* unfold */0], st, on_done, on_skip, (function (st, x) {
                              return Curry._2(on_yield, st, Curry._1(f, x));
                            }));
              })]
        ];
}

function fold$2(f, acc, param) {
  var u = param[1];
  var loop = function (st, acc) {
    return Curry._4(u[/* unfold */0], st, (function () {
                  return acc;
                }), (function (st$prime) {
                  return loop(st$prime, acc);
                }), (function (st$prime, x) {
                  var acc$1 = Curry._2(f, acc, x);
                  return loop(st$prime, acc$1);
                }));
  };
  return loop(param[0], acc);
}

function to_list_rev(iter) {
  return fold$2((function (acc, x) {
                return /* :: */[
                        x,
                        acc
                      ];
              }), /* [] */0, iter);
}

function of_list(l) {
  return /* CPS */[
          l,
          /* record */[/* unfold */(function (l, on_done, _, on_yield) {
                if (l) {
                  return Curry._2(on_yield, l[1], l[0]);
                } else {
                  return Curry._1(on_done, /* () */0);
                }
              })]
        ];
}

function $neg$neg$2(i, j) {
  return /* CPS */[
          i,
          /* record */[/* unfold */(function (i, on_done, _, on_yield) {
                if (i > j) {
                  return Curry._1(on_done, /* () */0);
                } else {
                  return Curry._2(on_yield, i + 1 | 0, i);
                }
              })]
        ];
}

function filter$2(f, param) {
  var u1 = param[1];
  return /* CPS */[
          param[0],
          /* record */[/* unfold */(function (st, on_done, on_skip, on_yield) {
                return Curry._4(u1[/* unfold */0], st, on_done, on_skip, (function (st$prime, x) {
                              if (Curry._1(f, x)) {
                                return Curry._2(on_yield, st$prime, x);
                              } else {
                                return Curry._1(on_skip, st$prime);
                              }
                            }));
              })]
        ];
}

function flat_map$2(f, param) {
  var u1 = param[1];
  var u = /* record */[/* unfold */(function (param, on_done, on_skip, on_yield) {
        var match = param[1];
        var sub2 = match[1];
        var st1 = param[0];
        var done_ = function () {
          return Curry._4(u1[/* unfold */0], st1, on_done, (function (st1$prime) {
                        return Curry._1(on_skip, /* tuple */[
                                    st1$prime,
                                    empty
                                  ]);
                      }), (function (st1$prime, x1) {
                        return Curry._1(on_skip, /* tuple */[
                                    st1$prime,
                                    Curry._1(f, x1)
                                  ]);
                      }));
        };
        var skip = function (sub_st2) {
          return Curry._1(on_skip, /* tuple */[
                      st1,
                      /* CPS */[
                        sub_st2,
                        sub2
                      ]
                    ]);
        };
        var yield_ = function (sub_st2, x2) {
          return Curry._2(on_yield, /* tuple */[
                      st1,
                      /* CPS */[
                        sub_st2,
                        sub2
                      ]
                    ], x2);
        };
        return Curry._4(sub2[/* unfold */0], match[0], done_, skip, yield_);
      })];
  return /* CPS */[
          /* tuple */[
            param[0],
            empty
          ],
          u
        ];
}

var CPS = /* module */[
  /* empty */empty,
  /* return */$$return,
  /* map */map$2,
  /* fold */fold$2,
  /* to_list_rev */to_list_rev,
  /* of_list */of_list,
  /* -- */$neg$neg$2,
  /* filter */filter$2,
  /* flat_map */flat_map$2
];

var empty$1 = /* CPS */[/* record */[
    /* state : () */0,
    /* unfold */(function (_, on_done, _$1, _$2) {
        return Curry._1(on_done, /* () */0);
      })
  ]];

function $$return$1(x) {
  return /* CPS */[/* record */[
            /* state : () */0,
            /* unfold */(function (_, _$1, _$2, on_yield) {
                return Curry._2(on_yield, /* () */0, x);
              })
          ]];
}

function map$3(f, param) {
  var match = param[0];
  var u = match[/* unfold */1];
  return /* CPS */[/* record */[
            /* state */match[/* state */0],
            /* unfold */(function (st, on_done, on_skip, on_yield) {
                return Curry._4(u, st, on_done, on_skip, (function (st, x) {
                              return Curry._2(on_yield, st, Curry._1(f, x));
                            }));
              })
          ]];
}

function fold$3(f, acc, param) {
  var match = param[0];
  var u = match[/* unfold */1];
  var loop = function (st, acc) {
    return Curry._4(u, st, (function () {
                  return acc;
                }), (function (st$prime) {
                  return loop(st$prime, acc);
                }), (function (st$prime, x) {
                  var acc$1 = Curry._2(f, acc, x);
                  return loop(st$prime, acc$1);
                }));
  };
  return loop(match[/* state */0], acc);
}

function to_list_rev$1(iter) {
  return fold$3((function (acc, x) {
                return /* :: */[
                        x,
                        acc
                      ];
              }), /* [] */0, iter);
}

function of_list$1(l) {
  return /* CPS */[/* record */[
            /* state */l,
            /* unfold */(function (l, on_done, _, on_yield) {
                if (l) {
                  return Curry._2(on_yield, l[1], l[0]);
                } else {
                  return Curry._1(on_done, /* () */0);
                }
              })
          ]];
}

function $neg$neg$3(i, j) {
  return /* CPS */[/* record */[
            /* state */i,
            /* unfold */(function (i, on_done, _, on_yield) {
                if (i > j) {
                  return Curry._1(on_done, /* () */0);
                } else {
                  return Curry._2(on_yield, i + 1 | 0, i);
                }
              })
          ]];
}

function filter$3(f, param) {
  var match = param[0];
  var u1 = match[/* unfold */1];
  return /* CPS */[/* record */[
            /* state */match[/* state */0],
            /* unfold */(function (st, on_done, on_skip, on_yield) {
                return Curry._4(u1, st, on_done, on_skip, (function (st$prime, x) {
                              if (Curry._1(f, x)) {
                                return Curry._2(on_yield, st$prime, x);
                              } else {
                                return Curry._1(on_skip, st$prime);
                              }
                            }));
              })
          ]];
}

function flat_map$3(f, param) {
  var match = param[0];
  var u1 = match[/* unfold */1];
  var u = function (param, on_done, on_skip, on_yield) {
    var match = param[1][0];
    var sub2 = match[/* unfold */1];
    var st1 = param[0];
    var done_ = function () {
      return Curry._4(u1, st1, on_done, (function (st1$prime) {
                    return Curry._1(on_skip, /* tuple */[
                                st1$prime,
                                empty$1
                              ]);
                  }), (function (st1$prime, x1) {
                    return Curry._1(on_skip, /* tuple */[
                                st1$prime,
                                Curry._1(f, x1)
                              ]);
                  }));
    };
    var skip = function (sub_st2) {
      return Curry._1(on_skip, /* tuple */[
                  st1,
                  /* CPS */[/* record */[
                      /* state */sub_st2,
                      /* unfold */sub2
                    ]]
                ]);
    };
    var yield_ = function (sub_st2, x2) {
      return Curry._2(on_yield, /* tuple */[
                  st1,
                  /* CPS */[/* record */[
                      /* state */sub_st2,
                      /* unfold */sub2
                    ]]
                ], x2);
    };
    return Curry._4(sub2, match[/* state */0], done_, skip, yield_);
  };
  return /* CPS */[/* record */[
            /* state : tuple */[
              match[/* state */0],
              empty$1
            ],
            /* unfold */u
          ]];
}

var CPS2 = /* module */[
  /* empty */empty$1,
  /* return */$$return$1,
  /* map */map$3,
  /* fold */fold$3,
  /* to_list_rev */to_list_rev$1,
  /* of_list */of_list$1,
  /* -- */$neg$neg$3,
  /* filter */filter$3,
  /* flat_map */flat_map$3
];

function map$4(param, m) {
  var match = param[0];
  var fold = match[/* fold */0];
  var fold$1 = function (s, init, f) {
    return Curry._3(fold, s, init, (function (b, a) {
                  return Curry._2(f, b, Curry._1(m, a));
                }));
  };
  return /* Fold */[/* record */[
            /* fold */fold$1,
            /* s */match[/* s */1]
          ]];
}

function filter$4(param, p) {
  var match = param[0];
  var fold = match[/* fold */0];
  var fold$1 = function (s, init, f) {
    return Curry._3(fold, s, init, (function (b, a) {
                  if (Curry._1(p, a)) {
                    return Curry._2(f, b, a);
                  } else {
                    return b;
                  }
                }));
  };
  return /* Fold */[/* record */[
            /* fold */fold$1,
            /* s */match[/* s */1]
          ]];
}

function fold$4(param) {
  var match = param[0];
  return Curry._1(match[/* fold */0], match[/* s */1]);
}

function flat_map$4(param, m) {
  var match = param[0];
  var s1 = match[/* s */1];
  var fold1 = match[/* fold */0];
  var fold = function (_, init, f) {
    return Curry._3(fold1, s1, init, (function (acc, x1) {
                  var match = Curry._1(m, x1);
                  var match$1 = match[0];
                  return Curry._3(match$1[/* fold */0], match$1[/* s */1], acc, f);
                }));
  };
  return /* Fold */[/* record */[
            /* fold */fold,
            /* s */s1
          ]];
}

function $neg$neg$4(i, j) {
  var fold = function (_s, _init, f) {
    while(true) {
      var init = _init;
      var s = _s;
      if (s > j) {
        return init;
      } else {
        _init = Curry._2(f, init, s);
        _s = s + 1 | 0;
        continue ;
        
      }
    };
  };
  return /* Fold */[/* record */[
            /* fold */fold,
            /* s */i
          ]];
}

var Fold = /* module */[
  /* map */map$4,
  /* filter */filter$4,
  /* fold */fold$4,
  /* flat_map */flat_map$4,
  /* -- */$neg$neg$4
];

function $neg$neg$5(i, j) {
  return Block.__(246, [(function () {
                if (i > j) {
                  return /* Nil */0;
                } else {
                  return /* Cons */[
                          i,
                          $neg$neg$5(i + 1 | 0, j)
                        ];
                }
              })]);
}

function map$5(f, l) {
  return Block.__(246, [(function () {
                var tag = l.tag | 0;
                var match = tag === 250 ? l[0] : (
                    tag === 246 ? CamlinternalLazy.force_lazy_block(l) : l
                  );
                if (match) {
                  return /* Cons */[
                          Curry._1(f, match[0]),
                          map$5(f, match[1])
                        ];
                } else {
                  return /* Nil */0;
                }
              })]);
}

function filter$5(f, l) {
  var aux = function (f, _l) {
    while(true) {
      var l = _l;
      var tag = l.tag | 0;
      var match = tag === 250 ? l[0] : (
          tag === 246 ? CamlinternalLazy.force_lazy_block(l) : l
        );
      if (match) {
        var tl = match[1];
        var x = match[0];
        if (Curry._1(f, x)) {
          return /* Cons */[
                  x,
                  Block.__(246, [(function(tl){
                      return function () {
                        return aux(f, tl);
                      }
                      }(tl))])
                ];
        } else {
          _l = tl;
          continue ;
          
        }
      } else {
        return /* Nil */0;
      }
    };
  };
  return Block.__(246, [(function () {
                return aux(f, l);
              })]);
}

function append(a, b) {
  return Block.__(246, [(function () {
                var tag = a.tag | 0;
                var match = tag === 250 ? a[0] : (
                    tag === 246 ? CamlinternalLazy.force_lazy_block(a) : a
                  );
                if (match) {
                  return /* Cons */[
                          match[0],
                          append(match[1], b)
                        ];
                } else {
                  var tag$1 = b.tag | 0;
                  if (tag$1 === 250) {
                    return b[0];
                  } else if (tag$1 === 246) {
                    return CamlinternalLazy.force_lazy_block(b);
                  } else {
                    return b;
                  }
                }
              })]);
}

function flat_map$5(f, l) {
  return Block.__(246, [(function () {
                var tag = l.tag | 0;
                var match = tag === 250 ? l[0] : (
                    tag === 246 ? CamlinternalLazy.force_lazy_block(l) : l
                  );
                if (match) {
                  var res = append(Curry._1(f, match[0]), flat_map$5(f, match[1]));
                  var tag$1 = res.tag | 0;
                  if (tag$1 === 250) {
                    return res[0];
                  } else if (tag$1 === 246) {
                    return CamlinternalLazy.force_lazy_block(res);
                  } else {
                    return res;
                  }
                } else {
                  return /* Nil */0;
                }
              })]);
}

function fold$5(f, _acc, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    var tag = param.tag | 0;
    var match = tag === 250 ? param[0] : (
        tag === 246 ? CamlinternalLazy.force_lazy_block(param) : param
      );
    if (match) {
      _param = match[1];
      _acc = Curry._2(f, acc, match[0]);
      continue ;
      
    } else {
      return acc;
    }
  };
}

var LList = /* module */[
  /* -- */$neg$neg$5,
  /* map */map$5,
  /* filter */filter$5,
  /* append */append,
  /* flat_map */flat_map$5,
  /* fold */fold$5
];

function $neg$neg$6(i, j, _) {
  if (i > j) {
    return /* Nil */0;
  } else {
    var partial_arg = i + 1 | 0;
    return /* Cons */[
            i,
            (function (param) {
                return $neg$neg$6(partial_arg, j, param);
              })
          ];
  }
}

function map$6(f, l, _) {
  var match = Curry._1(l, /* () */0);
  if (match) {
    var tail = match[1];
    return /* Cons */[
            Curry._1(f, match[0]),
            (function (param) {
                return map$6(f, tail, param);
              })
          ];
  } else {
    return /* Nil */0;
  }
}

function filter$6(f, l) {
  var aux = function (f, _l, _param) {
    while(true) {
      var l = _l;
      var match = Curry._1(l, /* () */0);
      if (match) {
        var tl = match[1];
        var x = match[0];
        if (Curry._1(f, x)) {
          return /* Cons */[
                  x,
                  (function(tl){
                  return function (param) {
                    return aux(f, tl, param);
                  }
                  }(tl))
                ];
        } else {
          _param = /* () */0;
          _l = tl;
          continue ;
          
        }
      } else {
        return /* Nil */0;
      }
    };
  };
  return (function (param) {
      return aux(f, l, param);
    });
}

function append$1(a, b, _) {
  var match = Curry._1(a, /* () */0);
  if (match) {
    var tl = match[1];
    return /* Cons */[
            match[0],
            (function (param) {
                return append$1(tl, b, param);
              })
          ];
  } else {
    return Curry._1(b, /* () */0);
  }
}

function flat_map$6(f, l, _) {
  var match = Curry._1(l, /* () */0);
  if (match) {
    var tl = match[1];
    var partial_arg = Curry._1(f, match[0]);
    var param = /* () */0;
    return append$1(partial_arg, (function (param) {
                  return flat_map$6(f, tl, param);
                }), param);
  } else {
    return /* Nil */0;
  }
}

function fold$6(f, _acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    var match = Curry._1(l, /* () */0);
    if (match) {
      _l = match[1];
      _acc = Curry._2(f, acc, match[0]);
      continue ;
      
    } else {
      return acc;
    }
  };
}

var UList = /* module */[
  /* -- */$neg$neg$6,
  /* map */map$6,
  /* filter */filter$6,
  /* append */append$1,
  /* flat_map */flat_map$6,
  /* fold */fold$6
];

var empty$2 = /* T */[/* record */[
    /* state : () */0,
    /* next */(function () {
        return /* None */0;
      })
  ]];

function $neg$neg$7(i, j) {
  var next = function (i) {
    if (i > j) {
      return /* None */0;
    } else {
      return /* Some */[/* tuple */[
                i,
                i + 1 | 0
              ]];
    }
  };
  return /* T */[/* record */[
            /* state */i,
            /* next */next
          ]];
}

function map$7(f, param) {
  var match = param[0];
  var next = match[/* next */1];
  var next$prime = function (s) {
    var match = Curry._1(next, s);
    if (match) {
      var match$1 = match[0];
      return /* Some */[/* tuple */[
                Curry._1(f, match$1[0]),
                match$1[1]
              ]];
    } else {
      return /* None */0;
    }
  };
  return /* T */[/* record */[
            /* state */match[/* state */0],
            /* next */next$prime
          ]];
}

function filter$7(f, param) {
  var match = param[0];
  var next = match[/* next */1];
  var next$prime = function (_s) {
    while(true) {
      var s = _s;
      var res = Curry._1(next, s);
      if (res) {
        var match = res[0];
        if (Curry._1(f, match[0])) {
          return res;
        } else {
          _s = match[1];
          continue ;
          
        }
      } else {
        return /* None */0;
      }
    };
  };
  return /* T */[/* record */[
            /* state */match[/* state */0],
            /* next */next$prime
          ]];
}

function flat_map$7(f, param) {
  var match = param[0];
  var next = match[/* next */1];
  var next$prime = function (_param) {
    while(true) {
      var param = _param;
      var match = param[0];
      var sub_next = match[/* sub_next */2];
      var top = match[/* top */0];
      var match$1 = Curry._1(sub_next, match[/* sub */1]);
      if (match$1) {
        var match$2 = match$1[0];
        return /* Some */[/* tuple */[
                  match$2[0],
                  /* FMS */[/* record */[
                      /* top */top,
                      /* sub */match$2[1],
                      /* sub_next */sub_next
                    ]]
                ]];
      } else {
        var match$3 = Curry._1(next, top);
        if (match$3) {
          var match$4 = match$3[0];
          var match$5 = Curry._1(f, match$4[0]);
          var match$6 = match$5[0];
          _param = /* FMS */[/* record */[
              /* top */match$4[1],
              /* sub */match$6[/* state */0],
              /* sub_next */match$6[/* next */1]
            ]];
          continue ;
          
        } else {
          return /* None */0;
        }
      }
    };
  };
  return /* T */[/* record */[
            /* state : FMS */[/* record */[
                /* top */match[/* state */0],
                /* sub : () */0,
                /* sub_next */(function () {
                    return /* None */0;
                  })
              ]],
            /* next */next$prime
          ]];
}

function fold$7(f, acc, param) {
  var match = param[0];
  var next = match[/* next */1];
  var f$1 = f;
  var _acc = acc;
  var _state = match[/* state */0];
  while(true) {
    var state = _state;
    var acc$1 = _acc;
    var match$1 = Curry._1(next, state);
    if (match$1) {
      var match$2 = match$1[0];
      var acc$2 = Curry._2(f$1, acc$1, match$2[0]);
      _state = match$2[1];
      _acc = acc$2;
      continue ;
      
    } else {
      return acc$1;
    }
  };
}

var UnCons = /* module */[
  /* empty */empty$2,
  /* -- */$neg$neg$7,
  /* map */map$7,
  /* filter */filter$7,
  /* flat_map */flat_map$7,
  /* fold */fold$7
];

function map$8(f, gen) {
  var stop = [/* false */0];
  return (function () {
      if (stop[0]) {
        return /* None */0;
      } else {
        var match = Curry._1(gen, /* () */0);
        if (match) {
          return /* Some */[Curry._1(f, match[0])];
        } else {
          stop[0] = /* true */1;
          return /* None */0;
        }
      }
    });
}

function filter$8(p, gen) {
  var next = function (_param) {
    while(true) {
      var res = Curry._1(gen, /* () */0);
      if (res) {
        if (Curry._1(p, res[0])) {
          return res;
        } else {
          _param = /* () */0;
          continue ;
          
        }
      } else {
        return /* None */0;
      }
    };
  };
  return next;
}

var RunState = /* module */[];

function flat_map$8(f, next_elem) {
  var state = [/* Init */0];
  var next = function () {
    var match = state[0];
    if (typeof match === "number") {
      if (match !== 0) {
        return /* None */0;
      } else {
        return get_next_gen(/* () */0);
      }
    } else {
      var x = Curry._1(match[0], /* () */0);
      if (x) {
        return x;
      } else {
        return get_next_gen(/* () */0);
      }
    }
  };
  var get_next_gen = function () {
    var match = Curry._1(next_elem, /* () */0);
    if (match) {
      try {
        state[0] = /* Run */[Curry._1(f, match[0])];
      }
      catch (e){
        state[0] = /* Stop */1;
        throw e;
      }
      return next(/* () */0);
    } else {
      state[0] = /* Stop */1;
      return /* None */0;
    }
  };
  return next;
}

function fold$8(f, _acc, gen) {
  while(true) {
    var acc = _acc;
    var match = Curry._1(gen, /* () */0);
    if (match) {
      _acc = Curry._2(f, acc, match[0]);
      continue ;
      
    } else {
      return acc;
    }
  };
}

function int_range($staropt$star, i, j) {
  var step = $staropt$star ? $staropt$star[0] : 1;
  if (!step) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Gen.int_range"
        ];
  }
  var $great = step > 0 ? Caml_obj.caml_greaterthan : Caml_obj.caml_lessthan;
  var r = [i];
  return (function () {
      var x = r[0];
      if (Curry._2($great, x, j)) {
        return /* None */0;
      } else {
        r[0] = r[0] + step | 0;
        return /* Some */[x];
      }
    });
}

var Gen = /* module */[
  /* map */map$8,
  /* filter */filter$8,
  /* RunState */RunState,
  /* flat_map */flat_map$8,
  /* fold */fold$8,
  /* int_range */int_range,
  /* -- */int_range
];

function map$9(f, seq, k) {
  return Curry._1(seq, (function (x) {
                return Curry._1(k, Curry._1(f, x));
              }));
}

function filter$9(p, seq, k) {
  return Curry._1(seq, (function (x) {
                if (Curry._1(p, x)) {
                  return Curry._1(k, x);
                } else {
                  return 0;
                }
              }));
}

function flat_map$9(f, seq, k) {
  return Curry._1(seq, (function (x) {
                return Curry._2(f, x, k);
              }));
}

function fold$9(f, init, seq) {
  var r = [init];
  Curry._1(seq, (function (elt) {
          r[0] = Curry._2(f, r[0], elt);
          return /* () */0;
        }));
  return r[0];
}

function int_range$1(start, stop, k) {
  for(var i = start; i <= stop; ++i){
    Curry._1(k, i);
  }
  return /* () */0;
}

function $neg$neg$8(i, j) {
  return (function (param) {
      return int_range$1(i, j, param);
    });
}

var Sequence = /* module */[
  /* map */map$9,
  /* filter */filter$9,
  /* flat_map */flat_map$9,
  /* fold */fold$9,
  /* int_range */int_range$1,
  /* -- */$neg$neg$8
];

function flat_map$10(f, l) {
  var f$1 = f;
  var _l = l;
  var _kont = function (l) {
    return l;
  };
  while(true) {
    var kont = _kont;
    var l$1 = _l;
    if (l$1) {
      var y = Curry._1(f$1, l$1[0]);
      var kont$prime = (function(kont,y){
      return function kont$prime(tail) {
        if (y) {
          var match = y[1];
          var x = y[0];
          if (match) {
            if (match[1]) {
              return Curry._1(kont, List.append(y, tail));
            } else {
              return Curry._1(kont, /* :: */[
                          x,
                          /* :: */[
                            match[0],
                            tail
                          ]
                        ]);
            }
          } else {
            return Curry._1(kont, /* :: */[
                        x,
                        tail
                      ]);
          }
        } else {
          return Curry._1(kont, tail);
        }
      }
      }(kont,y));
      _kont = kont$prime;
      _l = l$1[1];
      continue ;
      
    } else {
      return Curry._1(kont, /* [] */0);
    }
  };
}

function range(i, j) {
  if (i <= j) {
    var i$1 = i;
    var _j = j;
    var _acc = /* [] */0;
    while(true) {
      var acc = _acc;
      var j$1 = _j;
      if (i$1 === j$1) {
        return /* :: */[
                i$1,
                acc
              ];
      } else {
        _acc = /* :: */[
          j$1,
          acc
        ];
        _j = j$1 - 1 | 0;
        continue ;
        
      }
    };
  } else {
    var i$2 = i;
    var _j$1 = j;
    var _acc$1 = /* [] */0;
    while(true) {
      var acc$1 = _acc$1;
      var j$2 = _j$1;
      if (i$2 === j$2) {
        return /* :: */[
                i$2,
                acc$1
              ];
      } else {
        _acc$1 = /* :: */[
          j$2,
          acc$1
        ];
        _j$1 = j$2 + 1 | 0;
        continue ;
        
      }
    };
  }
}

var CCList = /* module */[
  /* length */List.length,
  /* hd */List.hd,
  /* tl */List.tl,
  /* nth */List.nth,
  /* rev */List.rev,
  /* append */List.append,
  /* rev_append */List.rev_append,
  /* concat */List.concat,
  /* flatten */List.flatten,
  /* iter */List.iter,
  /* iteri */List.iteri,
  /* map */List.map,
  /* mapi */List.mapi,
  /* rev_map */List.rev_map,
  /* fold_left */List.fold_left,
  /* fold_right */List.fold_right,
  /* iter2 */List.iter2,
  /* map2 */List.map2,
  /* rev_map2 */List.rev_map2,
  /* fold_left2 */List.fold_left2,
  /* fold_right2 */List.fold_right2,
  /* for_all */List.for_all,
  /* exists */List.exists,
  /* for_all2 */List.for_all2,
  /* exists2 */List.exists2,
  /* mem */List.mem,
  /* memq */List.memq,
  /* find */List.find,
  /* filter */List.filter,
  /* find_all */List.find_all,
  /* partition */List.partition,
  /* assoc */List.assoc,
  /* assq */List.assq,
  /* mem_assoc */List.mem_assoc,
  /* mem_assq */List.mem_assq,
  /* remove_assoc */List.remove_assoc,
  /* remove_assq */List.remove_assq,
  /* split */List.split,
  /* combine */List.combine,
  /* sort */List.sort,
  /* stable_sort */List.stable_sort,
  /* fast_sort */List.fast_sort,
  /* sort_uniq */List.sort_uniq,
  /* merge */List.merge,
  /* flat_map */flat_map$10,
  /* range */range,
  /* -- */range
];

var Step = /* module */[];

function empty_001$1() {
  return /* Done */0;
}

var empty$3 = /* Sequence */[
  /* () */0,
  empty_001$1
];

function unfold_step(init, f) {
  return /* Sequence */[
          init,
          f
        ];
}

function map$10(t, f) {
  var next = t[1];
  return /* Sequence */[
          t[0],
          (function (seed) {
              var match = Curry._1(next, seed);
              if (typeof match === "number") {
                return /* Done */0;
              } else if (match.tag) {
                return /* Yield */Block.__(1, [
                          Curry._1(f, match[0]),
                          match[1]
                        ]);
              } else {
                return /* Skip */Block.__(0, [match[0]]);
              }
            })
        ];
}

function filter$10(t, f) {
  var next = t[1];
  return /* Sequence */[
          t[0],
          (function (seed) {
              var match = Curry._1(next, seed);
              if (typeof match === "number") {
                return /* Done */0;
              } else if (match.tag) {
                var s = match[1];
                var a = match[0];
                if (Curry._1(f, a)) {
                  return /* Yield */Block.__(1, [
                            a,
                            s
                          ]);
                } else {
                  return /* Skip */Block.__(0, [s]);
                }
              } else {
                return /* Skip */Block.__(0, [match[0]]);
              }
            })
        ];
}

function bind(t, f) {
  return /* Sequence */[
          /* tuple */[
            empty$3,
            t
          ],
          (function (param) {
              var rest = param[1];
              var match = param[0];
              var next = match[1];
              var match$1 = Curry._1(next, match[0]);
              if (typeof match$1 === "number") {
                var next$1 = rest[1];
                var match$2 = Curry._1(next$1, rest[0]);
                if (typeof match$2 === "number") {
                  return /* Done */0;
                } else if (match$2.tag) {
                  return /* Skip */Block.__(0, [/* tuple */[
                              Curry._1(f, match$2[0]),
                              /* Sequence */[
                                match$2[1],
                                next$1
                              ]
                            ]]);
                } else {
                  return /* Skip */Block.__(0, [/* tuple */[
                              empty$3,
                              /* Sequence */[
                                match$2[0],
                                next$1
                              ]
                            ]]);
                }
              } else if (match$1.tag) {
                return /* Yield */Block.__(1, [
                          match$1[0],
                          /* tuple */[
                            /* Sequence */[
                              match$1[1],
                              next
                            ],
                            rest
                          ]
                        ]);
              } else {
                return /* Skip */Block.__(0, [/* tuple */[
                            /* Sequence */[
                              match$1[0],
                              next
                            ],
                            rest
                          ]]);
              }
            })
        ];
}

var concat_map = bind;

function fold$10(t, init, f) {
  var _seed = t[0];
  var _v = init;
  var next = t[1];
  var f$1 = f;
  while(true) {
    var v = _v;
    var seed = _seed;
    var match = Curry._1(next, seed);
    if (typeof match === "number") {
      return v;
    } else if (match.tag) {
      _v = Curry._2(f$1, v, match[0]);
      _seed = match[1];
      continue ;
      
    } else {
      _seed = match[0];
      continue ;
      
    }
  };
}

function range$1($staropt$star, $staropt$star$1, $staropt$star$2, start_v, stop_v) {
  var stride = $staropt$star ? $staropt$star[0] : 1;
  var start = $staropt$star$1 ? $staropt$star$1[0] : /* inclusive */104758188;
  var stop = $staropt$star$2 ? $staropt$star$2[0] : /* exclusive */-160346914;
  var step = stop >= 104758188 ? (
      stride >= 0 ? (function (i) {
            if (i > stop_v) {
              return /* Done */0;
            } else {
              return /* Yield */Block.__(1, [
                        i,
                        i + stride | 0
                      ]);
            }
          }) : (function (i) {
            if (i < stop_v) {
              return /* Done */0;
            } else {
              return /* Yield */Block.__(1, [
                        i,
                        i + stride | 0
                      ]);
            }
          })
    ) : (
      stride >= 0 ? (function (i) {
            if (i >= stop_v) {
              return /* Done */0;
            } else {
              return /* Yield */Block.__(1, [
                        i,
                        i + stride | 0
                      ]);
            }
          }) : (function (i) {
            if (i <= stop_v) {
              return /* Done */0;
            } else {
              return /* Yield */Block.__(1, [
                        i,
                        i + stride | 0
                      ]);
            }
          })
    );
  var init = start >= 104758188 ? start_v : start_v + stride | 0;
  return /* Sequence */[
          init,
          step
        ];
}

var Core_kernel_sequence = /* module */[
  /* Step */Step,
  /* empty */empty$3,
  /* unfold_step */unfold_step,
  /* map */map$10,
  /* filter */filter$10,
  /* bind */bind,
  /* concat_map */concat_map,
  /* fold */fold$10,
  /* range */range$1
];

function f_gen() {
  return fold$8((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$8((function (x) {
                    return int_range(/* None */0, x, x + 30 | 0);
                  }), filter$8((function (x) {
                        return +(x % 2 === 0);
                      }), map$8((function (x) {
                            return x + 1 | 0;
                          }), int_range(/* None */0, 1, 100000)))));
}

function f_g() {
  var partial_arg = $neg$neg(1, 100000);
  var partial_arg$1 = function (param) {
    return map((function (x) {
                  return x + 1 | 0;
                }), partial_arg, param);
  };
  return fold((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map((function (x) {
                    return $neg$neg(x, x + 30 | 0);
                  }), (function (param) {
                    return filter((function (x) {
                                  return +(x % 2 === 0);
                                }), partial_arg$1, param);
                  })));
}

function f_g_exn() {
  var partial_arg = $neg$neg$1(1, 100000);
  var partial_arg$1 = function () {
    return Curry._1(partial_arg, /* () */0) + 1 | 0;
  };
  return fold$1((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$1((function (x) {
                    return $neg$neg$1(x, x + 30 | 0);
                  }), (function (param) {
                    return filter$1((function (x) {
                                  return +(x % 2 === 0);
                                }), partial_arg$1, param);
                  })));
}

function f_seq() {
  return fold$9((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, (function (param) {
                var f = function (x) {
                  var partial_arg = x + 30 | 0;
                  return (function (param) {
                      return int_range$1(x, partial_arg, param);
                    });
                };
                var param$1 = function (x) {
                  return Curry._2(f, x, param);
                };
                return filter$9((function (x) {
                              return +(x % 2 === 0);
                            }), (function (param) {
                              var f = function (x) {
                                return x + 1 | 0;
                              };
                              return int_range$1(1, 100000, (function (x) {
                                            return Curry._1(param, Curry._1(f, x));
                                          }));
                            }), param$1);
              }));
}

function f_cps() {
  return fold$2((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$2((function (x) {
                    return $neg$neg$2(x, x + 30 | 0);
                  }), filter$2((function (x) {
                        return +(x % 2 === 0);
                      }), map$2((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$2(1, 100000)))));
}

function f_cps2() {
  return fold$3((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$3((function (x) {
                    return $neg$neg$3(x, x + 30 | 0);
                  }), filter$3((function (x) {
                        return +(x % 2 === 0);
                      }), map$3((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$3(1, 100000)))));
}

function f_fold() {
  var arg = function (prim, prim$1) {
    return prim + prim$1 | 0;
  };
  var arg$1 = function (x) {
    return $neg$neg$4(x, x + 30 | 0);
  };
  var arg$2 = function (i) {
    return +(i % 2 === 0);
  };
  var arg$3 = function (x) {
    return x + 1 | 0;
  };
  return (function (param) {
              return Curry._2(fold$4(param), 0, arg);
            })((function (param) {
                  return flat_map$4(param, arg$1);
                })((function (param) {
                      return filter$4(param, arg$2);
                    })((function (param) {
                          return map$4(param, arg$3);
                        })($neg$neg$4(1, 100000)))));
}

function f_list() {
  return List.fold_left((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$10((function (x) {
                    return range(x, x + 30 | 0);
                  }), List.filter((function (x) {
                          return +(x % 2 === 0);
                        }))(List.map((function (x) {
                            return x + 1 | 0;
                          }), range(1, 100000)))));
}

function f_llist() {
  return fold$5((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$5((function (x) {
                    return $neg$neg$5(x, x + 30 | 0);
                  }), filter$5((function (x) {
                        return +(x % 2 === 0);
                      }), map$5((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$5(1, 100000)))));
}

function f_ulist() {
  var partial_arg = filter$6((function (x) {
          return +(x % 2 === 0);
        }), (function (param) {
          return map$6((function (x) {
                        return x + 1 | 0;
                      }), (function (param) {
                        return $neg$neg$6(1, 100000, param);
                      }), param);
        }));
  return fold$6((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, (function (param) {
                return flat_map$6((function (x) {
                              var partial_arg = x + 30 | 0;
                              return (function (param) {
                                  return $neg$neg$6(x, partial_arg, param);
                                });
                            }), partial_arg, param);
              }));
}

function f_uncons() {
  return fold$7((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$7((function (x) {
                    return $neg$neg$7(x, x + 30 | 0);
                  }), filter$7((function (x) {
                        return +(x % 2 === 0);
                      }), map$7((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$7(1, 100000)))));
}

function f_core() {
  var arg = function (prim, prim$1) {
    return prim + prim$1 | 0;
  };
  var arg$1 = function (x) {
    return range$1(/* None */0, /* Some */[/* inclusive */104758188], /* Some */[/* inclusive */104758188], x, x + 30 | 0);
  };
  var arg$2 = function (x) {
    return +(x % 2 === 0);
  };
  var arg$3 = function (x) {
    return x + 1 | 0;
  };
  return (function (param) {
              return fold$10(param, 0, arg);
            })((function (param) {
                  return bind(param, arg$1);
                })((function (param) {
                      return filter$10(param, arg$2);
                    })((function (param) {
                          return map$10(param, arg$3);
                        })(range$1(/* None */0, /* Some */[/* inclusive */104758188], /* Some */[/* inclusive */104758188], 1, 100000)))));
}

if (f_g(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          776,
          0
        ]
      ];
}

if (f_g_exn(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          777,
          0
        ]
      ];
}

if (f_seq(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          778,
          0
        ]
      ];
}

if (f_core(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          779,
          0
        ]
      ];
}

if (f_fold(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          780,
          0
        ]
      ];
}

if (f_uncons(/* () */0) !== f_gen(/* () */0)) {
  throw [
        Caml_builtin_exceptions.assert_failure,
        [
          "c_cube_iterators.ml",
          781,
          0
        ]
      ];
}

new Benchmark.Suite("tags").add("Gen", (function () {
                                  f_gen(/* () */0);
                                  return /* () */0;
                                })).add("g", (function () {
                                f_g(/* () */0);
                                return /* () */0;
                              })).add("g_exn", (function () {
                              f_g_exn(/* () */0);
                              return /* () */0;
                            })).add("core.sequence", (function () {
                            f_core(/* () */0);
                            return /* () */0;
                          })).add("cps", (function () {
                          f_cps(/* () */0);
                          return /* () */0;
                        })).add("cps2", (function () {
                        f_cps2(/* () */0);
                        return /* () */0;
                      })).add("fold", (function () {
                      f_fold(/* () */0);
                      return /* () */0;
                    })).add("sequence", (function () {
                    f_seq(/* () */0);
                    return /* () */0;
                  })).add("list", (function () {
                  f_list(/* () */0);
                  return /* () */0;
                })).add("lazy_list", (function () {
                f_llist(/* () */0);
                return /* () */0;
              })).add("ulist", (function () {
              f_ulist(/* () */0);
              return /* () */0;
            })).add("uncons", (function () {
            f_uncons(/* () */0);
            return /* () */0;
          })).on("cycle", (function ($$event) {
          console.log(String($$event.target));
          return /* () */0;
        })).run();

exports.G                    = G;
exports.G_exn                = G_exn;
exports.CPS                  = CPS;
exports.CPS2                 = CPS2;
exports.Fold                 = Fold;
exports.LList                = LList;
exports.UList                = UList;
exports.UnCons               = UnCons;
exports.Gen                  = Gen;
exports.Sequence             = Sequence;
exports.CCList               = CCList;
exports.Core_kernel_sequence = Core_kernel_sequence;
exports.f_gen                = f_gen;
exports.f_g                  = f_g;
exports.f_g_exn              = f_g_exn;
exports.f_seq                = f_seq;
exports.f_cps                = f_cps;
exports.f_cps2               = f_cps2;
exports.f_fold               = f_fold;
exports.f_list               = f_list;
exports.f_llist              = f_llist;
exports.f_ulist              = f_ulist;
exports.f_uncons             = f_uncons;
exports.f_core               = f_core;
/*  Not a pure module */
