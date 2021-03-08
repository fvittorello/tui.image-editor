tui.util.defineNamespace("fedoc.content", {});
fedoc.content["component_line.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @author NHN Ent. FE Development Team &lt;dl_javascript@nhnent.com>\n * @fileoverview Free drawing module, Set brush\n */\n'use strict';\n\nvar Component = require('../interface/Component');\nvar consts = require('../consts');\n\n/**\n * Line\n * @class Line\n * @param {Component} parent - parent component\n * @extends {Component}\n */\nvar Line = tui.util.defineClass(Component, /** @lends FreeDrawing.prototype */{\n    init: function(parent) {\n        this.setParent(parent);\n\n        /**\n         * Brush width\n         * @type {number}\n         * @private\n         */\n        this._width = 12;\n\n        /**\n         * fabric.Color instance for brush color\n         * @type {fabric.Color}\n         * @private\n         */\n        this._oColor = new fabric.Color('rgba(0, 0, 0, 0.5)');\n\n        /**\n         * Listeners\n         * @type {object.&lt;string, function>}\n         * @private\n         */\n        this._listeners = {\n            mousedown: $.proxy(this._onFabricMouseDown, this),\n            mousemove: $.proxy(this._onFabricMouseMove, this),\n            mouseup: $.proxy(this._onFabricMouseUp, this)\n        };\n    },\n\n    /**\n     * Component name\n     * @type {string}\n     */\n    name: consts.componentNames.LINE,\n\n    /**\n     * Start drawing line mode\n     * @param {{width: ?number, color: ?string}} [setting] - Brush width &amp; color\n     */\n    start: function(setting) {\n        var canvas = this.getCanvas();\n\n        canvas.defaultCursor = 'crosshair';\n        canvas.selection = false;\n\n        this.setBrush(setting);\n\n        canvas.forEachObject(function(obj) {\n            obj.set({\n                evented: false\n            });\n        });\n\n        canvas.on({\n            'mouse:down': this._listeners.mousedown\n        });\n    },\n\n    /**\n     * Set brush\n     * @param {{width: ?number, color: ?string}} [setting] - Brush width &amp; color\n     */\n    setBrush: function(setting) {\n        var brush = this.getCanvas().freeDrawingBrush;\n\n        setting = setting || {};\n        this._width = setting.width || this._width;\n\n        if (setting.color) {\n            this._oColor = new fabric.Color(setting.color);\n        }\n        brush.width = this._width;\n        brush.color = this._oColor.toRgba();\n    },\n\n    /**\n     * End drawing line mode\n     */\n    end: function() {\n        var canvas = this.getCanvas();\n\n        canvas.defaultCursor = 'default';\n        canvas.selection = true;\n\n        canvas.forEachObject(function(obj) {\n            obj.set({\n                evented: true\n            });\n        });\n\n        canvas.off('mouse:down', this._listeners.mousedown);\n    },\n\n    /**\n     * Mousedown event handler in fabric canvas\n     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object\n     * @private\n     */\n    _onFabricMouseDown: function(fEvent) {\n        var canvas = this.getCanvas();\n        var pointer = canvas.getPointer(fEvent.e);\n        var points = [pointer.x, pointer.y, pointer.x, pointer.y];\n\n        this._line = new fabric.Line(points, {\n            stroke: this._oColor.toRgba(),\n            strokeWidth: this._width,\n            evented: false\n        });\n\n        this._line.set(consts.fObjectOptions.SELECTION_STYLE);\n\n        canvas.add(this._line);\n\n        canvas.on({\n            'mouse:move': this._listeners.mousemove,\n            'mouse:up': this._listeners.mouseup\n        });\n    },\n\n    /**\n     * Mousemove event handler in fabric canvas\n     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object\n     * @private\n     */\n    _onFabricMouseMove: function(fEvent) {\n        var canvas = this.getCanvas();\n        var pointer = canvas.getPointer(fEvent.e);\n\n        this._line.set({\n            x2: pointer.x,\n            y2: pointer.y\n        });\n\n        this._line.setCoords();\n\n        canvas.renderAll();\n    },\n\n    /**\n     * Mouseup event handler in fabric canvas\n     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object\n     * @private\n     */\n    _onFabricMouseUp: function() {\n        var canvas = this.getCanvas();\n\n        this._line = null;\n\n        canvas.off({\n            'mouse:move': this._listeners.mousemove,\n            'mouse:up': this._listeners.mouseup\n        });\n    }\n});\n\nmodule.exports = Line;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"