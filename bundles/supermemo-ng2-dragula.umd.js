(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('dragula'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@supermemo/ng2-dragula', ['exports', 'dragula', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.supermemo = global.supermemo || {}, global.supermemo['ng2-dragula'] = {}),global.dragula,global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,dragulaExpt,core,rxjs,operators) { 'use strict';

    var dragulaExpt__default = 'default' in dragulaExpt ? dragulaExpt['default'] : dragulaExpt;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Group = /** @class */ (function () {
        function Group(name, drake, options) {
            this.name = name;
            this.drake = drake;
            this.options = options;
            this.initEvents = false;
        }
        return Group;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @enum {string} */
    var EventTypes = {
        Cancel: "cancel",
        Cloned: "cloned",
        Drag: "drag",
        DragEnd: "dragend",
        Drop: "drop",
        Out: "out",
        Over: "over",
        Remove: "remove",
        Shadow: "shadow",
        DropModel: "dropModel",
        RemoveModel: "removeModel",
    };
    /** @type {?} */
    var AllEvents = Object.keys(EventTypes).map(function (k) { return (EventTypes[ /** @type {?} */(k)]); });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var dragula = dragulaExpt__default || dragulaExpt;
    var DrakeFactory = /** @class */ (function () {
        function DrakeFactory(build) {
            if (build === void 0) {
                build = dragula;
            }
            this.build = build;
        }
        return DrakeFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var filterEvent = function (eventType, filterDragType, projector) {
        return function (input) {
            return input.pipe(operators.filter(function (_a) {
                var event = _a.event, name = _a.name;
                return event === eventType
                    && (filterDragType === undefined || name === filterDragType);
            }), operators.map(function (_a) {
                var name = _a.name, args = _a.args;
                return projector(name, args);
            }));
        };
    };
    /** @type {?} */
    var elContainerSourceProjector = function (name, _a) {
        var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
        return ({ name: name, el: el, container: container, source: source });
    };
    var DragulaService = /** @class */ (function () {
        function DragulaService(drakeFactory) {
            if (drakeFactory === void 0) {
                drakeFactory = null;
            }
            var _this = this;
            this.drakeFactory = drakeFactory;
            this.dispatch$ = new rxjs.Subject();
            this.drag = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
                    var _b = __read(_a, 2), el = _b[0], source = _b[1];
                    return ({ name: name, el: el, source: source });
                }));
            };
            this.dragend = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
                    var _b = __read(_a, 1), el = _b[0];
                    return ({ name: name, el: el });
                }));
            };
            this.drop = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
                    var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
                    return { name: name, el: el, target: target, source: source, sibling: sibling };
                }));
            };
            this.elContainerSource = function (eventType) {
                return function (groupName) {
                    return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
                };
            };
            this.cancel = this.elContainerSource(EventTypes.Cancel);
            this.remove = this.elContainerSource(EventTypes.Remove);
            this.shadow = this.elContainerSource(EventTypes.Shadow);
            this.over = this.elContainerSource(EventTypes.Over);
            this.out = this.elContainerSource(EventTypes.Out);
            this.cloned = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
                    var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
                    return { name: name, clone: clone, original: original, cloneType: cloneType };
                }));
            };
            this.dropModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
                    var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
                    return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
                }));
            };
            this.removeModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
                    var _b = __read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
                    return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel, sourceIndex: sourceIndex };
                }));
            };
            this.groups = {};
            if (this.drakeFactory === null) {
                this.drakeFactory = new DrakeFactory();
            }
        }
        /**
         * Public mainly for testing purposes. Prefer `createGroup()`.
         * @param {?} group
         * @return {?}
         */
        DragulaService.prototype.add = /**
         * Public mainly for testing purposes. Prefer `createGroup()`.
         * @param {?} group
         * @return {?}
         */
            function (group) {
                /** @type {?} */
                var existingGroup = this.find(group.name);
                if (existingGroup) {
                    throw new Error('Group named: "' + group.name + '" already exists.');
                }
                this.groups[group.name] = group;
                this.handleModels(group);
                this.setupEvents(group);
                return group;
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaService.prototype.find = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                return this.groups[name];
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaService.prototype.destroy = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                /** @type {?} */
                var group = this.find(name);
                if (!group) {
                    return;
                }
                group.drake && group.drake.destroy();
                delete this.groups[name];
            };
        /**
         * Creates a group with the specified name and options.
         *
         * Note: formerly known as `setOptions`
         * @template T
         * @param {?} name
         * @param {?} options
         * @return {?}
         */
        DragulaService.prototype.createGroup = /**
         * Creates a group with the specified name and options.
         *
         * Note: formerly known as `setOptions`
         * @template T
         * @param {?} name
         * @param {?} options
         * @return {?}
         */
            function (name, options) {
                console.log(name, options);
                return this.add(new Group(name, this.drakeFactory.build([], options), options));
            };
        /**
         * @param {?} __0
         * @return {?}
         */
        DragulaService.prototype.handleModels = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var _this = this;
                var name = _a.name, drake = _a.drake, options = _a.options;
                /** @type {?} */
                var dragElm;
                /** @type {?} */
                var dragIndex;
                /** @type {?} */
                var dropIndex;
                drake.on('remove', function (el, container, source) {
                    if (!drake.models) {
                        return;
                    }
                    /** @type {?} */
                    var sourceModel = drake.models[drake.containers.indexOf(source)];
                    sourceModel = sourceModel.slice(0);
                    /** @type {?} */
                    var item = sourceModel.splice(dragIndex, 1)[0];
                    // console.log('REMOVE');
                    // console.log(sourceModel);
                    // console.log('REMOVE');
                    // console.log(sourceModel);
                    _this.dispatch$.next({
                        event: EventTypes.RemoveModel,
                        name: name,
                        args: [el, container, source, item, sourceModel, dragIndex]
                    });
                });
                drake.on('drag', function (el, source) {
                    if (!drake.models) {
                        return;
                    }
                    dragElm = el;
                    dragIndex = _this.domIndexOf(el, source);
                });
                drake.on('drop', function (dropElm, target, source, sibling) {
                    if (!drake.models || !target) {
                        return;
                    }
                    dropIndex = _this.domIndexOf(dropElm, target);
                    /** @type {?} */
                    var sourceModel = drake.models[drake.containers.indexOf(source)];
                    /** @type {?} */
                    var targetModel = drake.models[drake.containers.indexOf(target)];
                    /** @type {?} */
                    var item;
                    if (target === source) {
                        sourceModel = sourceModel.slice(0);
                        item = sourceModel.splice(dragIndex, 1)[0];
                        sourceModel.splice(dropIndex, 0, item);
                        // this was true before we cloned and updated sourceModel,
                        // but targetModel still has the old value
                        targetModel = sourceModel;
                    }
                    else {
                        /** @type {?} */
                        var isCopying = dragElm !== dropElm;
                        item = sourceModel[dragIndex];
                        if (isCopying) {
                            if (!options.copyItem) {
                                throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
                            }
                            item = options.copyItem(item);
                        }
                        if (!isCopying) {
                            sourceModel = sourceModel.slice(0);
                            sourceModel.splice(dragIndex, 1);
                        }
                        targetModel = targetModel.slice(0);
                        targetModel.splice(dropIndex, 0, item);
                        if (isCopying) {
                            try {
                                target.removeChild(dropElm);
                            }
                            catch (e) { }
                        }
                    }
                    _this.dispatch$.next({
                        event: EventTypes.DropModel,
                        name: name,
                        args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
                    });
                });
            };
        /**
         * @param {?} group
         * @return {?}
         */
        DragulaService.prototype.setupEvents = /**
         * @param {?} group
         * @return {?}
         */
            function (group) {
                var _this = this;
                if (group.initEvents) {
                    return;
                }
                group.initEvents = true;
                /** @type {?} */
                var name = group.name;
                /** @type {?} */
                var emitter = function (event) {
                    group.drake.on(event, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.dispatch$.next({ event: event, name: name, args: args });
                    });
                };
                AllEvents.forEach(emitter);
            };
        /**
         * @param {?} child
         * @param {?} parent
         * @return {?}
         */
        DragulaService.prototype.domIndexOf = /**
         * @param {?} child
         * @param {?} parent
         * @return {?}
         */
            function (child, parent) {
                return Array.prototype.indexOf.call(parent.children, child);
            };
        DragulaService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DragulaService.ctorParameters = function () {
            return [
                { type: DrakeFactory, decorators: [{ type: core.Optional }] }
            ];
        };
        return DragulaService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DragulaDirective = /** @class */ (function () {
        function DragulaDirective(el, dragulaService) {
            this.el = el;
            this.dragulaService = dragulaService;
            this.dragulaModelChange = new core.EventEmitter();
        }
        Object.defineProperty(DragulaDirective.prototype, "container", {
            get: /**
             * @return {?}
             */ function () {
                return this.el && this.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        DragulaDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes && changes.dragula) {
                    var _a = changes.dragula, prev = _a.previousValue, current = _a.currentValue, firstChange = _a.firstChange;
                    /** @type {?} */
                    var hadPreviousValue = !!prev;
                    /** @type {?} */
                    var hasNewValue = !!current;
                    // something -> null       =>  teardown only
                    // something -> something  =>  teardown, then setup
                    //      null -> something  =>  setup only
                    //
                    //      null -> null (precluded by fact of change being present)
                    if (hadPreviousValue) {
                        this.teardown(prev);
                    }
                    if (hasNewValue) {
                        this.setup();
                    }
                }
                else if (changes && changes.dragulaModel) {
                    var _b = changes.dragulaModel, prev = _b.previousValue, current = _b.currentValue, firstChange = _b.firstChange;
                    var drake = this.group.drake;
                    if (this.dragula && drake) {
                        drake.models = drake.models || [];
                        /** @type {?} */
                        var prevIndex = drake.models.indexOf(prev);
                        if (prevIndex !== -1) {
                            // delete the previous
                            drake.models.splice(prevIndex, 1);
                            // maybe insert a new one at the same spot
                            if (!!current) {
                                drake.models.splice(prevIndex, 0, current);
                            }
                        }
                        else if (!!current) {
                            // no previous one to remove; just push this one.
                            drake.models.push(current);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        DragulaDirective.prototype.setup = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var checkModel = function (group) {
                    if (_this.dragulaModel) {
                        if (group.drake.models) {
                            group.drake.models.push(_this.dragulaModel);
                        }
                        else {
                            group.drake.models = [_this.dragulaModel];
                        }
                    }
                };
                /** @type {?} */
                var group = this.dragulaService.find(this.dragula);
                if (!group) {
                    /** @type {?} */
                    var options = {};
                    group = this.dragulaService.createGroup(this.dragula, options);
                }
                // ensure model and container element are pushed
                checkModel(group);
                group.drake.containers.push(this.container);
                this.subscribe(this.dragula);
                this.group = group;
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaDirective.prototype.subscribe = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                var _this = this;
                this.subs = new rxjs.Subscription();
                this.subs.add(this.dragulaService
                    .dropModel(name)
                    .subscribe(function (_a) {
                    var source = _a.source, target = _a.target, sourceModel = _a.sourceModel, targetModel = _a.targetModel;
                    if (source === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(sourceModel);
                    }
                    else if (target === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(targetModel);
                    }
                }));
                this.subs.add(this.dragulaService
                    .removeModel(name)
                    .subscribe(function (_a) {
                    var source = _a.source, sourceModel = _a.sourceModel;
                    if (source === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(sourceModel);
                    }
                }));
            };
        /**
         * @param {?} groupName
         * @return {?}
         */
        DragulaDirective.prototype.teardown = /**
         * @param {?} groupName
         * @return {?}
         */
            function (groupName) {
                if (this.subs) {
                    this.subs.unsubscribe();
                }
                /** @type {?} */
                var group = this.dragulaService.find(groupName);
                if (group) {
                    /** @type {?} */
                    var itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
                    if (itemToRemove !== -1) {
                        group.drake.containers.splice(itemToRemove, 1);
                    }
                    if (this.dragulaModel && group.drake && group.drake.models) {
                        /** @type {?} */
                        var modelIndex = group.drake.models.indexOf(this.dragulaModel);
                        if (modelIndex !== -1) {
                            group.drake.models.splice(modelIndex, 1);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        DragulaDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.teardown(this.dragula);
            };
        DragulaDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[dragula]' },] }
        ];
        /** @nocollapse */
        DragulaDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DragulaService }
            ];
        };
        DragulaDirective.propDecorators = {
            dragula: [{ type: core.Input }],
            dragulaModel: [{ type: core.Input }],
            dragulaModelChange: [{ type: core.Output }]
        };
        return DragulaDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DragulaModule = /** @class */ (function () {
        function DragulaModule() {
        }
        /**
         * @return {?}
         */
        DragulaModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: DragulaModule,
                    providers: [DragulaService]
                };
            };
        DragulaModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [DragulaDirective],
                        declarations: [DragulaDirective],
                    },] }
        ];
        return DragulaModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var MockDrakeFactory = new DrakeFactory(function (containers, options) {
        return new MockDrake(containers, options);
    });
    /**
     * You can use MockDrake to simulate Drake events.
     *
     * The three methods that actually do anything are `on(event, listener)`,
     * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
     * events, and if you injected MockDrake properly with MockDrakeFactory or
     * mocked the DragulaService.find() method, then you can make ng2-dragula think
     * drags and drops are happening.
     *
     * Caveats:
     *
     * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
     * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
     *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
     * 3. None of the other methods do anything.
     *    That's ok, because ng2-dragula doesn't use them.
     */
    var /**
     * You can use MockDrake to simulate Drake events.
     *
     * The three methods that actually do anything are `on(event, listener)`,
     * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
     * events, and if you injected MockDrake properly with MockDrakeFactory or
     * mocked the DragulaService.find() method, then you can make ng2-dragula think
     * drags and drops are happening.
     *
     * Caveats:
     *
     * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
     * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
     *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
     * 3. None of the other methods do anything.
     *    That's ok, because ng2-dragula doesn't use them.
     */ MockDrake = /** @class */ (function () {
        /**
         * @param containers A list of container elements.
         * @param options These will NOT be used. At all.
         * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
         *               Note, default value is undefined, like a real Drake. Don't change that.
         */
        function MockDrake(containers, options, models) {
            if (containers === void 0) {
                containers = [];
            }
            if (options === void 0) {
                options = {};
            }
            this.containers = containers;
            this.options = options;
            this.models = models;
            /* Doesn't represent anything meaningful. */
            this.dragging = false;
            this.emitter$ = new rxjs.Subject();
            this.subs = new rxjs.Subscription();
        }
        /* Does nothing useful. */
        /**
         * @param {?} item
         * @return {?}
         */
        MockDrake.prototype.start = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.dragging = true;
            };
        /* Does nothing useful. */
        /**
         * @return {?}
         */
        MockDrake.prototype.end = /**
         * @return {?}
         */
            function () {
                this.dragging = false;
            };
        /**
         * @param {?=} revert
         * @return {?}
         */
        MockDrake.prototype.cancel = /**
         * @param {?=} revert
         * @return {?}
         */
            function (revert) {
                this.dragging = false;
            };
        /* Does nothing useful. */
        /**
         * @return {?}
         */
        MockDrake.prototype.remove = /**
         * @return {?}
         */
            function () {
                this.dragging = false;
            };
        /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
        MockDrake.prototype.on = /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
            function (event, callback) {
                this.subs.add(this.emitter$
                    .pipe(operators.filter(function (_a) {
                    var eventType = _a.eventType;
                    return eventType === event;
                }))
                    .subscribe(function (_a) {
                    var args = _a.args;
                    callback.apply(void 0, __spread(args));
                }));
            };
        /**
         * @return {?}
         */
        MockDrake.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.subs.unsubscribe();
            };
        /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         */
        /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         * @param {?} eventType
         * @param {...?} args
         * @return {?}
         */
        MockDrake.prototype.emit = /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         * @param {?} eventType
         * @param {...?} args
         * @return {?}
         */
            function (eventType) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this.emitter$.next({ eventType: eventType, args: args });
            };
        return MockDrake;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DragulaDirective = DragulaDirective;
    exports.DragulaService = DragulaService;
    exports.DragulaModule = DragulaModule;
    exports.dragula = dragula;
    exports.DrakeFactory = DrakeFactory;
    exports.Group = Group;
    exports.EventTypes = EventTypes;
    exports.MockDrake = MockDrake;
    exports.MockDrakeFactory = MockDrakeFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=supermemo-ng2-dragula.umd.js.map