// Generated by CoffeeScript 1.6.1
(function() {
  var ColorScheme,
    __hasProp = {}.hasOwnProperty;

  ColorScheme = (function() {
    var clone, splitwords, word, _i, _len, _ref;

    splitwords = function(words) {
      return words.split(/\s+/);
    };

    ColorScheme.SCHEMES = {};

    _ref = "mono monochromatic contrast triade tetrade analogic".split(/\s+/);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      word = _ref[_i];
      ColorScheme.SCHEMES[word] = true;
    }

    ColorScheme.PRESETS = {
      "default": [-1, -1, 1, -0.7, 0.25, 1, 0.5, 1],
      pastel: [0.5, -0.9, 0.5, 0.5, 0.1, 0.9, 0.75, 0.75],
      soft: [0.3, -0.8, 0.3, 0.5, 0.1, 0.9, 0.5, 0.75],
      light: [0.25, 1, 0.5, 0.75, 0.1, 1, 0.5, 1],
      hard: [1, -1, 1, -0.6, 0.1, 1, 0.6, 1],
      pale: [0.1, -0.85, 0.1, 0.5, 0.1, 1, 0.1, 0.75]
    };

    ColorScheme.COLOR_WHEEL = {
      0: [255, 0, 0, 100],
      15: [255, 51, 0, 100],
      30: [255, 102, 0, 100],
      45: [255, 128, 0, 100],
      60: [255, 153, 0, 100],
      75: [255, 178, 0, 100],
      90: [255, 204, 0, 100],
      105: [255, 229, 0, 100],
      120: [255, 255, 0, 100],
      135: [204, 255, 0, 100],
      150: [153, 255, 0, 100],
      165: [51, 255, 0, 100],
      180: [0, 204, 0, 80],
      195: [0, 178, 102, 70],
      210: [0, 153, 153, 60],
      225: [0, 102, 178, 70],
      240: [0, 51, 204, 80],
      255: [25, 25, 178, 70],
      270: [51, 0, 153, 60],
      285: [64, 0, 153, 60],
      300: [102, 0, 153, 60],
      315: [153, 0, 153, 60],
      330: [204, 0, 153, 80],
      345: [229, 0, 102, 90]
    };

    function ColorScheme() {
      var colors, _j;
      colors = [];
      for (_j = 1; _j <= 4; _j++) {
        colors.push(new ColorScheme.mutablecolor(60));
      }
      this.col = colors;
      this._scheme = 'mono';
      this._distance = 0.5;
      this._web_safe = false;
      this._add_complement = false;
    }

    /*
    
    colors()
    
    Returns an array of 4, 8, 12 or 16 colors in RRGGBB hexidecimal notation
    (without a leading "#") depending on the color scheme and addComplement
    parameter. For each set of four, the first is usually the most saturated color,
    the second a darkened version, the third a pale version and fourth
    a less-pale version. 
    
    For example: With a contrast scheme, "colors()" would return eight colors.
    Indexes 1 and 5 could be background colors, 2 and 6 could be foreground colors.
    
    Trust me, it's much better if you check out the Color Scheme web site, whose
    URL is listed in "Description"
    */


    ColorScheme.prototype.colors = function() {
      var dispatch, h, i, j, output, used_colors, _j, _k, _ref1,
        _this = this;
      used_colors = 1;
      h = this.col[0].get_hue();
      dispatch = {
        mono: function() {},
        contrast: function() {
          used_colors = 2;
          _this.col[1].set_hue(h);
          return _this.col[1].rotate(180);
        },
        triade: function() {
          var dif;
          used_colors = 3;
          dif = 60 * _this._distance;
          _this.col[1].set_hue(h);
          _this.col[1].rotate(180 - dif);
          _this.col[2].set_hue(h);
          return _this.col[2].rotate(180 + dif);
        },
        tetrade: function() {
          var dif;
          used_colors = 4;
          dif = 90 * _this._distance;
          _this.col[1].set_hue(h);
          _this.col[1].rotate(180);
          _this.col[2].set_hue(h);
          _this.col[2].rotate(180 + dif);
          _this.col[3].set_hue(h);
          return _this.col[3].rotate(dif);
        },
        analogic: function() {
          var dif;
          used_colors = _this._add_complement ? 4 : 3;
          dif = 60 * _this._distance;
          _this.col[1].set_hue(h);
          _this.col[1].rotate(dif);
          _this.col[2].set_hue(h);
          _this.col[2].rotate(360 - dif);
          _this.col[3].set_hue(h);
          return _this.col[3].rotate(180);
        }
      };
      dispatch['monochromatic'] = dispatch['mono'];
      if (dispatch[this._scheme] != null) {
        dispatch[this._scheme]();
      } else {
        throw "Unknown color scheme name: " + this._scheme;
      }
      output = [];
      for (i = _j = 0, _ref1 = used_colors - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        for (j = _k = 0; _k <= 3; j = ++_k) {
          output[i * 4 + j] = this.col[i].get_hex(this._web_safe, j);
        }
      }
      return output;
    };

    /*
    
    colorset()
    
    Returns a list of lists of the colors in groups of four. This method simply
    allows you to reference a color in the scheme by its group isntead of its
    absolute index in the list of colors.  I am assuming that "colorset()"
    will make it easier to use this module with the templating systems that are
    out there.
    
    For example, if you were to follow the synopsis, say you wanted to retrieve
    the two darkest colors from the first two groups of the scheme, which is
    typically the second color in the group. You could retrieve them with
    "colors()"
    
        first_background  = (scheme.colors())[1];
        second_background = (scheme.colors())[5];
    
    Or, with this method,
    
        first_background  = (scheme.colorset())[0][1]
        second_background = (scheme.colorset())[1][1]
    */


    ColorScheme.prototype.colorset = function() {
      var flat_colors, grouped_colors;
      flat_colors = clone(this.colors());
      grouped_colors = [];
      while (flat_colors.length > 0) {
        grouped_colors.push(flat_colors.splice(0, 4));
      }
      return grouped_colors;
    };

    /*
    
    from_hue( degrees )
    
    Sets the base color hue, where 'degrees' is an integer. (Values greater than
    359 and less than 0 wrap back around the wheel.)
    
    The default base hue is 0, or bright red.
    */


    ColorScheme.prototype.from_hue = function(h) {
      if (h == null) {
        throw "variation needs an argument";
      }
      this.col[0].set_hue(h);
      return this;
    };

    /*
    
    from_hex( color )
    
    Sets the base color to the given color, where 'color' is in the hexidecimal
    form RRGGBB. 'color' should not be preceded with a hash (#).
    
    The default base color is the equivalent of #ff0000, or bright red.
    */


    ColorScheme.prototype.from_hex = function(hex) {
      var b, c, g, h, h0, h1, h2, hsv, hsv1, i, i1, i2, k, num, r, rgb2hsv, rgbcap, s, v, wheelKeys, _ref1;
      if (hex == null) {
        throw "from_hex needs an argument";
      }
      if (!/^([0-9A-F]{2}){3}$/im.test(hex)) {
        throw "from_hex(" + hex + ") - argument must be in the form of RRGGBB";
      }
      rgbcap = /(..)(..)(..)/.exec(hex).slice(1, 4);
      _ref1 = (function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = rgbcap.length; _j < _len1; _j++) {
          num = rgbcap[_j];
          _results.push(parseInt(num, 16));
        }
        return _results;
      })(), r = _ref1[0], g = _ref1[1], b = _ref1[2];
      rgb2hsv = function(r, g, b) {
        var d, h, max, min, s, v;
        min = Math.min.apply(Math, [r, g, b]);
        max = Math.max.apply(Math, [r, g, b]);
        d = max - min;
        v = max;
        s;
        if (d > 0) {
          s = d / max;
        } else {
          return [0, 0, v];
        }
        h = (r === max ? (g - b) / d : (g === max ? 2 + (b - r) / d : 4 + (r - g) / d));
        h *= 60;
        h %= 360;
        return [h, s, v];
      };
      hsv = rgb2hsv((function() {
        var _j, _len1, _ref2, _results;
        _ref2 = [r, g, b];
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          i = _ref2[_j];
          _results.push(i / 255);
        }
        return _results;
      })());
      h0 = hsv[0];
      h1 = 0;
      h2 = 1000;
      i1 = null;
      i2 = null;
      h = null;
      s = null;
      v = null;
      wheelKeys = [];
      for (i in COLOR_WHEEL) {
        if (!__hasProp.call(COLOR_WHEEL, i)) continue;
        wheelKeys.push(i);
      }
      for (i in wheelKeys.sort(function(a, b) {
        return a - b;
      })) {
        c = ColorScheme.COLOR_WHEEL[i];
        hsv1 = rgb2hsv((function() {
          var _j, _len1, _ref2, _results;
          _ref2 = c.slice(0, 3);
          _results = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            i = _ref2[_j];
            _results.push(i / 255);
          }
          return _results;
        })());
        h = hsv1[0];
        if (h >= h1 && h <= h0) {
          h1 = h;
          i1 = i;
        }
        if (h <= h2 && h >= h0) {
          h2 = h;
          i2 = i;
        }
      }
      if (h2 === 0 || h2 > 360) {
        h2 = 360;
        i2 = 360;
      }
      k = h2 !== h1 ? (h0 - h1) / (h2 - h1) : 0;
      h = Math.round(i1 + k * (i2 - i1));
      h %= 360;
      s = hsv[1];
      v = hsv[2];
      this.from_hue(h);
      this._set_variant_preset([s, v, s, v * 0.7, s * 0.25, 1, s * 0.5, 1]);
      return this;
    };

    /*
    
    add_complement( BOOLEAN )
    
    If BOOLEAN is true, an extra set of colors will be produced using the
    complement of the selected color. 
    
    This only works with the analogic color scheme. The default is false.
    */


    ColorScheme.prototype.add_complement = function(b) {
      if (b == null) {
        throw "add_complement needs an argument";
      }
      this._add_complement = b;
      return this;
    };

    /*
    
    web_safe( BOOL )
    
    Sets whether the colors returned by L<"colors()"> or L<"colorset()"> will be
    web-safe. 
    
    The default is false.
    */


    ColorScheme.prototype.web_safe = function(b) {
      if (b == null) {
        throw "web_safe needs an argument";
      }
      this._web_safe = b;
      return this;
    };

    /*
    
    distance( FLOAT )
    
    'FLOAT'> must be a value from 0 to 1. You might use this with the "triade"
    "tetrade" or "analogic" color schemes.
    
    The default is 0.5.
    */


    ColorScheme.prototype.distance = function(d) {
      if (d == null) {
        throw "distance needs an argument";
      }
      if (d < 0) {
        throw "distance(" + d + ") - argument must be >= 0";
      }
      if (d > 1) {
        throw "distance(" + d + ") - argument must be <= 1";
      }
      this._distance = d;
      return this;
    };

    /*
    
    scheme( name )
    
    'name' must be a valid color scheme name. See "Color Schemes". The default
    is "mono"
    */


    ColorScheme.prototype.scheme = function(name) {
      if (name == null) {
        throw "scheme needs an argument";
      }
      if (ColorScheme.SCHEMES[name] == null) {
        throw "'" + name + "' isn't a valid scheme name";
      }
      this._scheme = name;
      return this;
    };

    /*
    
    variation( name )
    
    'name' must be a valid color variation name. See "Color Variations"
    */


    ColorScheme.prototype.variation = function(v) {
      if (v == null) {
        throw "variation needs an argument";
      }
      if (ColorScheme.PRESETS[v] == null) {
        throw "'$v' isn't a valid variation name";
      }
      this._set_variant_preset(ColorScheme.PRESETS[v]);
      return this;
    };

    ColorScheme.prototype._set_variant_preset = function(p) {
      var i, _j, _results;
      _results = [];
      for (i = _j = 0; _j <= 3; i = ++_j) {
        _results.push(this.col[i].set_variant_preset(p));
      }
      return _results;
    };

    clone = function(obj) {
      var flags, key, newInstance;
      if ((obj == null) || typeof obj !== 'object') {
        return obj;
      }
      if (obj instanceof Date) {
        return new Date(obj.getTime());
      }
      if (obj instanceof RegExp) {
        flags = '';
        if (obj.global != null) {
          flags += 'g';
        }
        if (obj.ignoreCase != null) {
          flags += 'i';
        }
        if (obj.multiline != null) {
          flags += 'm';
        }
        if (obj.sticky != null) {
          flags += 'y';
        }
        return new RegExp(obj.source, flags);
      }
      newInstance = new obj.constructor();
      for (key in obj) {
        newInstance[key] = clone(obj[key]);
      }
      return newInstance;
    };

    ColorScheme.mutablecolor = (function() {

      mutablecolor.prototype.hue = 0;

      mutablecolor.prototype.saturation = [];

      mutablecolor.prototype.value = [];

      mutablecolor.prototype.base_red = 0;

      mutablecolor.prototype.base_green = 0;

      mutablecolor.prototype.base_saturation = 0;

      mutablecolor.prototype.base_value = 0;

      function mutablecolor(hue) {
        if (hue == null) {
          throw "No hue specified";
        }
        this.saturation = [];
        this.value = [];
        this.base_red = 0;
        this.base_green = 0;
        this.base_blue = 0;
        this.base_saturation = 0;
        this.base_value = 0;
        this.set_hue(hue);
        this.set_variant_preset(ColorScheme.PRESETS['default']);
      }

      mutablecolor.prototype.get_hue = function() {
        return this.hue;
      };

      mutablecolor.prototype.set_hue = function(h) {
        var avrg, color, colorset1, colorset2, d, derivative1, derivative2, en, i, k;
        avrg = function(a, b, k) {
          return a + Math.round((b - a) * k);
        };
        this.hue = Math.round(h % 360);
        d = this.hue % 15 + (this.hue - Math.floor(this.hue));
        k = d / 15;
        derivative1 = this.hue - Math.floor(d);
        derivative2 = (derivative1 + 15) % 360;
        colorset1 = ColorScheme.COLOR_WHEEL[derivative1];
        colorset2 = ColorScheme.COLOR_WHEEL[derivative2];
        en = {
          red: 0,
          green: 1,
          blue: 2,
          value: 3
        };
        for (color in en) {
          i = en[color];
          this["base_" + color] = avrg(colorset1[i], colorset2[i], k);
        }
        this.base_saturation = avrg(100, 100, k) / 100;
        return this.base_value /= 100;
      };

      mutablecolor.prototype.rotate = function(angle) {
        var newhue;
        newhue = (this.hue + angle) % 360;
        return this.set_hue(newhue);
      };

      mutablecolor.prototype.get_saturation = function(variation) {
        var s, x;
        x = this.saturation[variation];
        s = x < 0 ? -x * this.base_saturation : x;
        if (s > 1) {
          s = 1;
        }
        if (s < 0) {
          s = 0;
        }
        return s;
      };

      mutablecolor.prototype.get_value = function(variation) {
        var v, x;
        x = this.value[variation];
        v = x < 0 ? -x * this.base_value : x;
        if (v > 1) {
          v = 1;
        }
        if (v < 0) {
          v = 0;
        }
        return v;
      };

      mutablecolor.prototype.set_variant = function(variation, s, v) {
        this.saturation[variation] = s;
        return this.value[variation] = v;
      };

      mutablecolor.prototype.set_variant_preset = function(p) {
        var i, _j, _results;
        _results = [];
        for (i = _j = 0; _j <= 3; i = ++_j) {
          _results.push(this.set_variant(i, p[2 * i], p[2 * i + 1]));
        }
        return _results;
      };

      mutablecolor.prototype.get_hex = function(web_safe, variation) {
        var c, color, formatted, i, k, max, min, rgb, rgbVal, s, str, v, _j, _k, _len1, _len2, _ref1;
        max = Math.max.apply(Math, (function() {
          var _j, _len1, _ref1, _results;
          _ref1 = ['red', 'green', 'blue'];
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            color = _ref1[_j];
            _results.push(this["base_" + color]);
          }
          return _results;
        }).call(this));
        min = Math.min.apply(Math, (function() {
          var _j, _len1, _ref1, _results;
          _ref1 = ['red', 'green', 'blue'];
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            color = _ref1[_j];
            _results.push(this["base_" + color]);
          }
          return _results;
        }).call(this));
        v = (variation < 0 ? this.base_value : this.get_value(variation)) * 255;
        s = variation < 0 ? this.base_saturation : this.get_saturation(variation);
        k = max > 0 ? v / max : 0;
        rgb = [];
        _ref1 = ['red', 'green', 'blue'];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          color = _ref1[_j];
          rgbVal = Math.min.apply(Math, [255, Math.round(v - (v - this["base_" + color] * k) * s)]);
          rgb.push(rgbVal);
        }
        if (web_safe) {
          rgb = (function() {
            var _k, _len2, _results;
            _results = [];
            for (_k = 0, _len2 = rgb.length; _k < _len2; _k++) {
              c = rgb[_k];
              _results.push(Math.round(c / 51) * 51);
            }
            return _results;
          })();
        }
        formatted = "";
        for (_k = 0, _len2 = rgb.length; _k < _len2; _k++) {
          i = rgb[_k];
          str = i.toString(16);
          if (str.length < 2) {
            str = "0" + str;
          }
          formatted += str;
        }
        return formatted;
      };

      return mutablecolor;

    })();

    return ColorScheme;

  })();

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = ColorScheme;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return ColorScheme;
      });
    } else {
      window.ColorScheme = ColorScheme;
    }
  }

}).call(this);
