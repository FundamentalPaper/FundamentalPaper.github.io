(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/zone.js/dist/zone-evergreen.js":
/*!*****************************************************!*\
  !*** ./node_modules/zone.js/dist/zone-evergreen.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
     true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) :
    undefined;
}((function () { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const Zone$1 = (function (global) {
        const performance = global['performance'];
        function mark(name) { performance && performance['mark'] && performance['mark'](name); }
        function performanceMeasure(name, label) {
            performance && performance['measure'] && performance['measure'](name, label);
        }
        mark('Zone');
        // Initialize before it's accessed below.
        // __Zone_symbol_prefix global can be used to override the default zone
        // symbol prefix with a custom one if needed.
        const symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';
        function __symbol__(name) { return symbolPrefix + name; }
        const checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;
        if (global['Zone']) {
            // if global['Zone'] already exists (maybe zone.js was already loaded or
            // some other lib also registered a global object named Zone), we may need
            // to throw an error, but sometimes user may not want this error.
            // For example,
            // we have two web pages, page1 includes zone.js, page2 doesn't.
            // and the 1st time user load page1 and page2, everything work fine,
            // but when user load page2 again, error occurs because global['Zone'] already exists.
            // so we add a flag to let user choose whether to throw this error or not.
            // By default, if existing Zone is from zone.js, we will not throw the error.
            if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
                throw new Error('Zone already loaded.');
            }
            else {
                return global['Zone'];
            }
        }
        class Zone {
            constructor(parent, zoneSpec) {
                this._parent = parent;
                this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
                this._properties = zoneSpec && zoneSpec.properties || {};
                this._zoneDelegate =
                    new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
            }
            static assertZonePatched() {
                if (global['Promise'] !== patches['ZoneAwarePromise']) {
                    throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                        'has been overwritten.\n' +
                        'Most likely cause is that a Promise polyfill has been loaded ' +
                        'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                        'If you must load one, do so before loading zone.js.)');
                }
            }
            static get root() {
                let zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            }
            static get current() { return _currentZoneFrame.zone; }
            static get currentTask() { return _currentTask; }
            // tslint:disable-next-line:require-internal-with-underscore
            static __load_patch(name, fn) {
                if (patches.hasOwnProperty(name)) {
                    if (checkDuplicate) {
                        throw Error('Already loaded patch: ' + name);
                    }
                }
                else if (!global['__Zone_disable_' + name]) {
                    const perfName = 'Zone:' + name;
                    mark(perfName);
                    patches[name] = fn(global, Zone, _api);
                    performanceMeasure(perfName, perfName);
                }
            }
            get parent() { return this._parent; }
            get name() { return this._name; }
            get(key) {
                const zone = this.getZoneWith(key);
                if (zone)
                    return zone._properties[key];
            }
            getZoneWith(key) {
                let current = this;
                while (current) {
                    if (current._properties.hasOwnProperty(key)) {
                        return current;
                    }
                    current = current._parent;
                }
                return null;
            }
            fork(zoneSpec) {
                if (!zoneSpec)
                    throw new Error('ZoneSpec required!');
                return this._zoneDelegate.fork(this, zoneSpec);
            }
            wrap(callback, source) {
                if (typeof callback !== 'function') {
                    throw new Error('Expecting function got: ' + callback);
                }
                const _callback = this._zoneDelegate.intercept(this, callback, source);
                const zone = this;
                return function () {
                    return zone.runGuarded(_callback, this, arguments, source);
                };
            }
            run(callback, applyThis, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runGuarded(callback, applyThis = null, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runTask(task, applyThis, applyArgs) {
                if (task.zone != this) {
                    throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                }
                // https://github.com/angular/zone.js/issues/778, sometimes eventTask
                // will run in notScheduled(canceled) state, we should not try to
                // run such kind of task but just return
                if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                    return;
                }
                const reEntryGuard = task.state != running;
                reEntryGuard && task._transitionTo(running, scheduled);
                task.runCount++;
                const previousTask = _currentTask;
                _currentTask = task;
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                        task.cancelFn = undefined;
                    }
                    try {
                        return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    // if the task's state is notScheduled or unknown, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled && task.state !== unknown) {
                        if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                            reEntryGuard && task._transitionTo(scheduled, running);
                        }
                        else {
                            task.runCount = 0;
                            this._updateTaskCount(task, -1);
                            reEntryGuard &&
                                task._transitionTo(notScheduled, running, notScheduled);
                        }
                    }
                    _currentZoneFrame = _currentZoneFrame.parent;
                    _currentTask = previousTask;
                }
            }
            scheduleTask(task) {
                if (task.zone && task.zone !== this) {
                    // check if the task was rescheduled, the newZone
                    // should not be the children of the original zone
                    let newZone = this;
                    while (newZone) {
                        if (newZone === task.zone) {
                            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
                        }
                        newZone = newZone.parent;
                    }
                }
                task._transitionTo(scheduling, notScheduled);
                const zoneDelegates = [];
                task._zoneDelegates = zoneDelegates;
                task._zone = this;
                try {
                    task = this._zoneDelegate.scheduleTask(this, task);
                }
                catch (err) {
                    // should set task's state to unknown when scheduleTask throw error
                    // because the err may from reschedule, so the fromState maybe notScheduled
                    task._transitionTo(unknown, scheduling, notScheduled);
                    // TODO: @JiaLiPassion, should we check the result from handleError?
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                if (task._zoneDelegates === zoneDelegates) {
                    // we have to check because internally the delegate can reschedule the task.
                    this._updateTaskCount(task, 1);
                }
                if (task.state == scheduling) {
                    task._transitionTo(scheduled, scheduling);
                }
                return task;
            }
            scheduleMicroTask(source, callback, data, customSchedule) {
                return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
            }
            scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
            }
            scheduleEventTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
            }
            cancelTask(task) {
                if (task.zone != this)
                    throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                task._transitionTo(canceling, scheduled, running);
                try {
                    this._zoneDelegate.cancelTask(this, task);
                }
                catch (err) {
                    // if error occurs when cancelTask, transit the state to unknown
                    task._transitionTo(unknown, canceling);
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                this._updateTaskCount(task, -1);
                task._transitionTo(notScheduled, canceling);
                task.runCount = 0;
                return task;
            }
            _updateTaskCount(task, count) {
                const zoneDelegates = task._zoneDelegates;
                if (count == -1) {
                    task._zoneDelegates = null;
                }
                for (let i = 0; i < zoneDelegates.length; i++) {
                    zoneDelegates[i]._updateTaskCount(task.type, count);
                }
            }
        }
        // tslint:disable-next-line:require-internal-with-underscore
        Zone.__symbol__ = __symbol__;
        const DELEGATE_ZS = {
            name: '',
            onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
            onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
            onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
            onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
        };
        class ZoneDelegate {
            constructor(zone, parentDelegate, zoneSpec) {
                this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
                this.zone = zone;
                this._parentDelegate = parentDelegate;
                this._forkZS =
                    zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
                this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
                this._forkCurrZone =
                    zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
                this._interceptZS =
                    zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
                this._interceptDlgt =
                    zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
                this._interceptCurrZone =
                    zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
                this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
                this._invokeDlgt =
                    zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
                this._invokeCurrZone =
                    zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
                this._handleErrorZS =
                    zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
                this._handleErrorDlgt = zoneSpec &&
                    (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
                this._handleErrorCurrZone =
                    zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
                this._scheduleTaskZS =
                    zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
                this._scheduleTaskDlgt = zoneSpec &&
                    (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
                this._scheduleTaskCurrZone = zoneSpec &&
                    (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
                this._invokeTaskZS =
                    zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
                this._invokeTaskDlgt =
                    zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
                this._invokeTaskCurrZone =
                    zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
                this._cancelTaskZS =
                    zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
                this._cancelTaskDlgt =
                    zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
                this._cancelTaskCurrZone =
                    zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
                this._hasTaskZS = null;
                this._hasTaskDlgt = null;
                this._hasTaskDlgtOwner = null;
                this._hasTaskCurrZone = null;
                const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
                const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
                if (zoneSpecHasTask || parentHasTask) {
                    // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                    // a case all task related interceptors must go through this ZD. We can't short circuit it.
                    this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                    this._hasTaskDlgt = parentDelegate;
                    this._hasTaskDlgtOwner = this;
                    this._hasTaskCurrZone = zone;
                    if (!zoneSpec.onScheduleTask) {
                        this._scheduleTaskZS = DELEGATE_ZS;
                        this._scheduleTaskDlgt = parentDelegate;
                        this._scheduleTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onInvokeTask) {
                        this._invokeTaskZS = DELEGATE_ZS;
                        this._invokeTaskDlgt = parentDelegate;
                        this._invokeTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onCancelTask) {
                        this._cancelTaskZS = DELEGATE_ZS;
                        this._cancelTaskDlgt = parentDelegate;
                        this._cancelTaskCurrZone = this.zone;
                    }
                }
            }
            fork(targetZone, zoneSpec) {
                return this._forkZS ?
                    this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                    new Zone(targetZone, zoneSpec);
            }
            intercept(targetZone, callback, source) {
                return this._interceptZS ?
                    this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                    callback;
            }
            invoke(targetZone, callback, applyThis, applyArgs, source) {
                return this._invokeZS ?
                    this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                    callback.apply(applyThis, applyArgs);
            }
            handleError(targetZone, error) {
                return this._handleErrorZS ?
                    this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                    true;
            }
            scheduleTask(targetZone, task) {
                let returnTask = task;
                if (this._scheduleTaskZS) {
                    if (this._hasTaskZS) {
                        returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                    }
                    // clang-format off
                    returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                    // clang-format on
                    if (!returnTask)
                        returnTask = task;
                }
                else {
                    if (task.scheduleFn) {
                        task.scheduleFn(task);
                    }
                    else if (task.type == microTask) {
                        scheduleMicroTask(task);
                    }
                    else {
                        throw new Error('Task is missing scheduleFn.');
                    }
                }
                return returnTask;
            }
            invokeTask(targetZone, task, applyThis, applyArgs) {
                return this._invokeTaskZS ?
                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                    task.callback.apply(applyThis, applyArgs);
            }
            cancelTask(targetZone, task) {
                let value;
                if (this._cancelTaskZS) {
                    value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
                }
                else {
                    if (!task.cancelFn) {
                        throw Error('Task is not cancelable');
                    }
                    value = task.cancelFn(task);
                }
                return value;
            }
            hasTask(targetZone, isEmpty) {
                // hasTask should not throw error so other ZoneDelegate
                // can still trigger hasTask callback
                try {
                    this._hasTaskZS &&
                        this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
                }
                catch (err) {
                    this.handleError(targetZone, err);
                }
            }
            // tslint:disable-next-line:require-internal-with-underscore
            _updateTaskCount(type, count) {
                const counts = this._taskCounts;
                const prev = counts[type];
                const next = counts[type] = prev + count;
                if (next < 0) {
                    throw new Error('More tasks executed then were scheduled.');
                }
                if (prev == 0 || next == 0) {
                    const isEmpty = {
                        microTask: counts['microTask'] > 0,
                        macroTask: counts['macroTask'] > 0,
                        eventTask: counts['eventTask'] > 0,
                        change: type
                    };
                    this.hasTask(this.zone, isEmpty);
                }
            }
        }
        class ZoneTask {
            constructor(type, source, callback, options, scheduleFn, cancelFn) {
                // tslint:disable-next-line:require-internal-with-underscore
                this._zone = null;
                this.runCount = 0;
                // tslint:disable-next-line:require-internal-with-underscore
                this._zoneDelegates = null;
                // tslint:disable-next-line:require-internal-with-underscore
                this._state = 'notScheduled';
                this.type = type;
                this.source = source;
                this.data = options;
                this.scheduleFn = scheduleFn;
                this.cancelFn = cancelFn;
                if (!callback) {
                    throw new Error('callback is not defined');
                }
                this.callback = callback;
                const self = this;
                // TODO: @JiaLiPassion options should have interface
                if (type === eventTask && options && options.useG) {
                    this.invoke = ZoneTask.invokeTask;
                }
                else {
                    this.invoke = function () {
                        return ZoneTask.invokeTask.call(global, self, this, arguments);
                    };
                }
            }
            static invokeTask(task, target, args) {
                if (!task) {
                    task = this;
                }
                _numberOfNestedTaskFrames++;
                try {
                    task.runCount++;
                    return task.zone.runTask(task, target, args);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            }
            get zone() { return this._zone; }
            get state() { return this._state; }
            cancelScheduleRequest() { this._transitionTo(notScheduled, scheduling); }
            // tslint:disable-next-line:require-internal-with-underscore
            _transitionTo(toState, fromState1, fromState2) {
                if (this._state === fromState1 || this._state === fromState2) {
                    this._state = toState;
                    if (toState == notScheduled) {
                        this._zoneDelegates = null;
                    }
                }
                else {
                    throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? ' or \'' + fromState2 + '\'' : ''}, was '${this._state}'.`);
                }
            }
            toString() {
                if (this.data && typeof this.data.handleId !== 'undefined') {
                    return this.data.handleId.toString();
                }
                else {
                    return Object.prototype.toString.call(this);
                }
            }
            // add toJSON method to prevent cyclic error when
            // call JSON.stringify(zoneTask)
            toJSON() {
                return {
                    type: this.type,
                    state: this.state,
                    source: this.source,
                    zone: this.zone.name,
                    runCount: this.runCount
                };
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  MICROTASK QUEUE
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const symbolSetTimeout = __symbol__('setTimeout');
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        let _microTaskQueue = [];
        let _isDrainingMicrotaskQueue = false;
        let nativeMicroTaskQueuePromise;
        function scheduleMicroTask(task) {
            // if we are not running in any task, and there has not been anything scheduled
            // we must bootstrap the initial task creation by manually scheduling the drain
            if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
                // We are not running in Task, so we need to kickstart the microtask queue.
                if (!nativeMicroTaskQueuePromise) {
                    if (global[symbolPromise]) {
                        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                    }
                }
                if (nativeMicroTaskQueuePromise) {
                    let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                    if (!nativeThen) {
                        // native Promise is not patchable, we need to use `then` directly
                        // issue 1078
                        nativeThen = nativeMicroTaskQueuePromise['then'];
                    }
                    nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
                }
                else {
                    global[symbolSetTimeout](drainMicroTaskQueue, 0);
                }
            }
            task && _microTaskQueue.push(task);
        }
        function drainMicroTaskQueue() {
            if (!_isDrainingMicrotaskQueue) {
                _isDrainingMicrotaskQueue = true;
                while (_microTaskQueue.length) {
                    const queue = _microTaskQueue;
                    _microTaskQueue = [];
                    for (let i = 0; i < queue.length; i++) {
                        const task = queue[i];
                        try {
                            task.zone.runTask(task, null, null);
                        }
                        catch (error) {
                            _api.onUnhandledError(error);
                        }
                    }
                }
                _api.microtaskDrainDone();
                _isDrainingMicrotaskQueue = false;
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  BOOTSTRAP
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const NO_ZONE = { name: 'NO ZONE' };
        const notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
        const microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
        const patches = {};
        const _api = {
            symbol: __symbol__,
            currentZoneFrame: () => _currentZoneFrame,
            onUnhandledError: noop,
            microtaskDrainDone: noop,
            scheduleMicroTask: scheduleMicroTask,
            showUncaughtError: () => !Zone[__symbol__('ignoreConsoleErrorUncaughtError')],
            patchEventTarget: () => [],
            patchOnProperties: noop,
            patchMethod: () => noop,
            bindArguments: () => [],
            patchThen: () => noop,
            patchMacroTask: () => noop,
            setNativePromise: (NativePromise) => {
                // sometimes NativePromise.resolve static function
                // is not ready yet, (such as core-js/es6.promise)
                // so we need to check here.
                if (NativePromise && typeof NativePromise.resolve === 'function') {
                    nativeMicroTaskQueuePromise = NativePromise.resolve(0);
                }
            },
            patchEventPrototype: () => noop,
            isIEOrEdge: () => false,
            getGlobalObjects: () => undefined,
            ObjectDefineProperty: () => noop,
            ObjectGetOwnPropertyDescriptor: () => undefined,
            ObjectCreate: () => undefined,
            ArraySlice: () => [],
            patchClass: () => noop,
            wrapWithCurrentZone: () => noop,
            filterProperties: () => [],
            attachOriginToPatched: () => noop,
            _redefineProperty: () => noop,
            patchCallbacks: () => noop
        };
        let _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
        let _currentTask = null;
        let _numberOfNestedTaskFrames = 0;
        function noop() { }
        performanceMeasure('Zone', 'Zone');
        return global['Zone'] = Zone;
    })(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('ZoneAwarePromise', (global, Zone, api) => {
        const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        const ObjectDefineProperty = Object.defineProperty;
        function readableObjectToString(obj) {
            if (obj && obj.toString === Object.prototype.toString) {
                const className = obj.constructor && obj.constructor.name;
                return (className ? className : '') + ': ' + JSON.stringify(obj);
            }
            return obj ? obj.toString() : Object.prototype.toString.call(obj);
        }
        const __symbol__ = api.symbol;
        const _uncaughtPromiseErrors = [];
        const isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        const creationTrace = '__creationTrace__';
        api.onUnhandledError = (e) => {
            if (api.showUncaughtError()) {
                const rejection = e && e.rejection;
                if (rejection) {
                    console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
                }
                else {
                    console.error(e);
                }
            }
        };
        api.microtaskDrainDone = () => {
            while (_uncaughtPromiseErrors.length) {
                const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(() => { throw uncaughtPromiseError; });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            }
        };
        const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
        function handleUnhandledRejection(e) {
            api.onUnhandledError(e);
            try {
                const handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
                if (typeof handler === 'function') {
                    handler.call(this, e);
                }
            }
            catch (err) {
            }
        }
        function isThenable(value) { return value && value.then; }
        function forwardResolution(value) { return value; }
        function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
        const symbolState = __symbol__('state');
        const symbolValue = __symbol__('value');
        const symbolFinally = __symbol__('finally');
        const symbolParentPromiseValue = __symbol__('parentPromiseValue');
        const symbolParentPromiseState = __symbol__('parentPromiseState');
        const source = 'Promise.then';
        const UNRESOLVED = null;
        const RESOLVED = true;
        const REJECTED = false;
        const REJECTED_NO_CATCH = 0;
        function makeResolver(promise, state) {
            return (v) => {
                try {
                    resolvePromise(promise, state, v);
                }
                catch (err) {
                    resolvePromise(promise, false, err);
                }
                // Do not return value or you will break the Promise spec.
            };
        }
        const once = function () {
            let wasCalled = false;
            return function wrapper(wrappedFunction) {
                return function () {
                    if (wasCalled) {
                        return;
                    }
                    wasCalled = true;
                    wrappedFunction.apply(null, arguments);
                };
            };
        };
        const TYPE_ERROR = 'Promise resolved with itself';
        const CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
        // Promise Resolution
        function resolvePromise(promise, state, value) {
            const onceWrapper = once();
            if (promise === value) {
                throw new TypeError(TYPE_ERROR);
            }
            if (promise[symbolState] === UNRESOLVED) {
                // should only get value.then once based on promise spec.
                let then = null;
                try {
                    if (typeof value === 'object' || typeof value === 'function') {
                        then = value && value.then;
                    }
                }
                catch (err) {
                    onceWrapper(() => { resolvePromise(promise, false, err); })();
                    return promise;
                }
                // if (value instanceof ZoneAwarePromise) {
                if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                    value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                    value[symbolState] !== UNRESOLVED) {
                    clearRejectedNoCatch(value);
                    resolvePromise(promise, value[symbolState], value[symbolValue]);
                }
                else if (state !== REJECTED && typeof then === 'function') {
                    try {
                        then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                    }
                    catch (err) {
                        onceWrapper(() => { resolvePromise(promise, false, err); })();
                    }
                }
                else {
                    promise[symbolState] = state;
                    const queue = promise[symbolValue];
                    promise[symbolValue] = value;
                    if (promise[symbolFinally] === symbolFinally) {
                        // the promise is generated by Promise.prototype.finally
                        if (state === RESOLVED) {
                            // the state is resolved, should ignore the value
                            // and use parent promise value
                            promise[symbolState] = promise[symbolParentPromiseState];
                            promise[symbolValue] = promise[symbolParentPromiseValue];
                        }
                    }
                    // record task information in value when error occurs, so we can
                    // do some additional work such as render longStackTrace
                    if (state === REJECTED && value instanceof Error) {
                        // check if longStackTraceZone is here
                        const trace = Zone.currentTask && Zone.currentTask.data &&
                            Zone.currentTask.data[creationTrace];
                        if (trace) {
                            // only keep the long stack trace into error when in longStackTraceZone
                            ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                        }
                    }
                    for (let i = 0; i < queue.length;) {
                        scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                    }
                    if (queue.length == 0 && state == REJECTED) {
                        promise[symbolState] = REJECTED_NO_CATCH;
                        let uncaughtPromiseError = value;
                        if (!isDisableWrappingUncaughtPromiseRejection) {
                            // If disable wrapping uncaught promise reject
                            // and the rejected value is an Error object,
                            // use the value instead of wrapping it.
                            try {
                                // Here we throws a new Error to print more readable error log
                                // and if the value is not an error, zone.js builds an `Error`
                                // Object here to attach the stack information.
                                throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                                    (value && value.stack ? '\n' + value.stack : ''));
                            }
                            catch (err) {
                                uncaughtPromiseError = err;
                            }
                        }
                        uncaughtPromiseError.rejection = value;
                        uncaughtPromiseError.promise = promise;
                        uncaughtPromiseError.zone = Zone.current;
                        uncaughtPromiseError.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(uncaughtPromiseError);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
            // Resolving an already resolved promise is a noop.
            return promise;
        }
        const REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
        function clearRejectedNoCatch(promise) {
            if (promise[symbolState] === REJECTED_NO_CATCH) {
                // if the promise is rejected no catch status
                // and queue.length > 0, means there is a error handler
                // here to handle the rejected promise, we should trigger
                // windows.rejectionhandled eventHandler or nodejs rejectionHandled
                // eventHandler
                try {
                    const handler = Zone[REJECTION_HANDLED_HANDLER];
                    if (handler && typeof handler === 'function') {
                        handler.call(this, { rejection: promise[symbolValue], promise: promise });
                    }
                }
                catch (err) {
                }
                promise[symbolState] = REJECTED;
                for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
                    if (promise === _uncaughtPromiseErrors[i].promise) {
                        _uncaughtPromiseErrors.splice(i, 1);
                    }
                }
            }
        }
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
            clearRejectedNoCatch(promise);
            const promiseState = promise[symbolState];
            const delegate = promiseState ?
                (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
                (typeof onRejected === 'function') ? onRejected : forwardRejection;
            zone.scheduleMicroTask(source, () => {
                try {
                    const parentPromiseValue = promise[symbolValue];
                    const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                    if (isFinallyPromise) {
                        // if the promise is generated from finally call, keep parent promise's state and value
                        chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                        chainPromise[symbolParentPromiseState] = promiseState;
                    }
                    // should not pass value to finally callback
                    const value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                        [] :
                        [parentPromiseValue]);
                    resolvePromise(chainPromise, true, value);
                }
                catch (error) {
                    // if error occurs, should always return this error
                    resolvePromise(chainPromise, false, error);
                }
            }, chainPromise);
        }
        const ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
        const noop = function () { };
        class ZoneAwarePromise {
            static toString() { return ZONE_AWARE_PROMISE_TO_STRING; }
            static resolve(value) {
                return resolvePromise(new this(null), RESOLVED, value);
            }
            static reject(error) {
                return resolvePromise(new this(null), REJECTED, error);
            }
            static race(values) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                function onResolve(value) { resolve(value); }
                function onReject(error) { reject(error); }
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
                return promise;
            }
            static all(values) { return ZoneAwarePromise.allWithCallback(values); }
            static allSettled(values) {
                const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
                return P.allWithCallback(values, {
                    thenCallback: (value) => ({ status: 'fulfilled', value }),
                    errorCallback: (err) => ({ status: 'rejected', reason: err })
                });
            }
            static allWithCallback(values, callback) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                // Start at 2 to prevent prematurely resolving if .then is called immediately.
                let unresolvedCount = 2;
                let valueIndex = 0;
                const resolvedValues = [];
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    const curValueIndex = valueIndex;
                    try {
                        value.then((value) => {
                            resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
                            unresolvedCount--;
                            if (unresolvedCount === 0) {
                                resolve(resolvedValues);
                            }
                        }, (err) => {
                            if (!callback) {
                                reject(err);
                            }
                            else {
                                resolvedValues[curValueIndex] = callback.errorCallback(err);
                                unresolvedCount--;
                                if (unresolvedCount === 0) {
                                    resolve(resolvedValues);
                                }
                            }
                        });
                    }
                    catch (thenErr) {
                        reject(thenErr);
                    }
                    unresolvedCount++;
                    valueIndex++;
                }
                // Make the unresolvedCount zero-based again.
                unresolvedCount -= 2;
                if (unresolvedCount === 0) {
                    resolve(resolvedValues);
                }
                return promise;
            }
            constructor(executor) {
                const promise = this;
                if (!(promise instanceof ZoneAwarePromise)) {
                    throw new Error('Must be an instanceof Promise.');
                }
                promise[symbolState] = UNRESOLVED;
                promise[symbolValue] = []; // queue;
                try {
                    executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
                }
                catch (error) {
                    resolvePromise(promise, false, error);
                }
            }
            get [Symbol.toStringTag]() { return 'Promise'; }
            get [Symbol.species]() { return ZoneAwarePromise; }
            then(onFulfilled, onRejected) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = this.constructor || ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
                }
                return chainPromise;
            }
            catch(onRejected) {
                return this.then(null, onRejected);
            }
            finally(onFinally) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                chainPromise[symbolFinally] = symbolFinally;
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
                }
                return chainPromise;
            }
        }
        // Protect against aggressive optimizers dropping seemingly unused properties.
        // E.g. Closure Compiler in advanced mode.
        ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
        ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
        ZoneAwarePromise['race'] = ZoneAwarePromise.race;
        ZoneAwarePromise['all'] = ZoneAwarePromise.all;
        const NativePromise = global[symbolPromise] = global['Promise'];
        const ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
        let desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
        if (!desc || desc.configurable) {
            desc && delete desc.writable;
            desc && delete desc.value;
            if (!desc) {
                desc = { configurable: true, enumerable: true };
            }
            desc.get = function () {
                // if we already set ZoneAwarePromise, use patched one
                // otherwise return native one.
                return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
            };
            desc.set = function (NewNativePromise) {
                if (NewNativePromise === ZoneAwarePromise) {
                    // if the NewNativePromise is ZoneAwarePromise
                    // save to global
                    global[ZONE_AWARE_PROMISE] = NewNativePromise;
                }
                else {
                    // if the NewNativePromise is not ZoneAwarePromise
                    // for example: after load zone.js, some library just
                    // set es6-promise to global, if we set it to global
                    // directly, assertZonePatched will fail and angular
                    // will not loaded, so we just set the NewNativePromise
                    // to global[symbolPromise], so the result is just like
                    // we load ES6 Promise before zone.js
                    global[symbolPromise] = NewNativePromise;
                    if (!NewNativePromise.prototype[symbolThen]) {
                        patchThen(NewNativePromise);
                    }
                    api.setNativePromise(NewNativePromise);
                }
            };
            ObjectDefineProperty(global, 'Promise', desc);
        }
        global['Promise'] = ZoneAwarePromise;
        const symbolThenPatched = __symbol__('thenPatched');
        function patchThen(Ctor) {
            const proto = Ctor.prototype;
            const prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
            if (prop && (prop.writable === false || !prop.configurable)) {
                // check Ctor.prototype.then propertyDescriptor is writable or not
                // in meteor env, writable is false, we should ignore such case
                return;
            }
            const originalThen = proto.then;
            // Keep a reference to the original method.
            proto[symbolThen] = originalThen;
            Ctor.prototype.then = function (onResolve, onReject) {
                const wrapped = new ZoneAwarePromise((resolve, reject) => { originalThen.call(this, resolve, reject); });
                return wrapped.then(onResolve, onReject);
            };
            Ctor[symbolThenPatched] = true;
        }
        api.patchThen = patchThen;
        function zoneify(fn) {
            return function () {
                let resultPromise = fn.apply(this, arguments);
                if (resultPromise instanceof ZoneAwarePromise) {
                    return resultPromise;
                }
                let ctor = resultPromise.constructor;
                if (!ctor[symbolThenPatched]) {
                    patchThen(ctor);
                }
                return resultPromise;
            };
        }
        if (NativePromise) {
            patchThen(NativePromise);
            const fetch = global['fetch'];
            if (typeof fetch == 'function') {
                global[api.symbol('fetch')] = fetch;
                global['fetch'] = zoneify(fetch);
            }
        }
        // This is not part of public API, but it is useful for tests, so we expose it.
        Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
        return ZoneAwarePromise;
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Suppress closure compiler errors about unknown 'Zone' variable
     * @fileoverview
     * @suppress {undefinedVars,globalThis,missingRequire}
     */
    /// <reference types="node"/>
    // issue #989, to reduce bundle size, use short name
    /** Object.getOwnPropertyDescriptor */
    const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    /** Object.defineProperty */
    const ObjectDefineProperty = Object.defineProperty;
    /** Object.getPrototypeOf */
    const ObjectGetPrototypeOf = Object.getPrototypeOf;
    /** Object.create */
    const ObjectCreate = Object.create;
    /** Array.prototype.slice */
    const ArraySlice = Array.prototype.slice;
    /** addEventListener string const */
    const ADD_EVENT_LISTENER_STR = 'addEventListener';
    /** removeEventListener string const */
    const REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
    /** zoneSymbol addEventListener */
    const ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
    /** zoneSymbol removeEventListener */
    const ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
    /** true string const */
    const TRUE_STR = 'true';
    /** false string const */
    const FALSE_STR = 'false';
    /** Zone symbol prefix string const. */
    const ZONE_SYMBOL_PREFIX = Zone.__symbol__('');
    function wrapWithCurrentZone(callback, source) {
        return Zone.current.wrap(callback, source);
    }
    function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
        return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
    }
    const zoneSymbol = Zone.__symbol__;
    const isWindowExists = typeof window !== 'undefined';
    const internalWindow = isWindowExists ? window : undefined;
    const _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
    const REMOVE_ATTRIBUTE = 'removeAttribute';
    const NULL_ON_PROP_VALUE = [null];
    function bindArguments(args, source) {
        for (let i = args.length - 1; i >= 0; i--) {
            if (typeof args[i] === 'function') {
                args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
            }
        }
        return args;
    }
    function patchPrototype(prototype, fnNames) {
        const source = prototype.constructor['name'];
        for (let i = 0; i < fnNames.length; i++) {
            const name = fnNames[i];
            const delegate = prototype[name];
            if (delegate) {
                const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
                if (!isPropertyWritable(prototypeDesc)) {
                    continue;
                }
                prototype[name] = ((delegate) => {
                    const patched = function () {
                        return delegate.apply(this, bindArguments(arguments, source + '.' + name));
                    };
                    attachOriginToPatched(patched, delegate);
                    return patched;
                })(delegate);
            }
        }
    }
    function isPropertyWritable(propertyDesc) {
        if (!propertyDesc) {
            return true;
        }
        if (propertyDesc.writable === false) {
            return false;
        }
        return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
    }
    const isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]');
    const isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
    // we are in electron of nw, so we are both browser and nodejs
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isMix = typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
        !!(isWindowExists && internalWindow['HTMLElement']);
    const zoneSymbolEventNames = {};
    const wrapFn = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        let eventNameSymbol = zoneSymbolEventNames[event.type];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
        }
        const target = this || event.target || _global;
        const listener = target[eventNameSymbol];
        let result;
        if (isBrowser && target === internalWindow && event.type === 'error') {
            // window.onerror have different signiture
            // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
            // and onerror callback will prevent default when callback return true
            const errorEvent = event;
            result = listener &&
                listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
            if (result === true) {
                event.preventDefault();
            }
        }
        else {
            result = listener && listener.apply(this, arguments);
            if (result != undefined && !result) {
                event.preventDefault();
            }
        }
        return result;
    };
    function patchProperty(obj, prop, prototype) {
        let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
        if (!desc && prototype) {
            // when patch window object, use prototype to check prop exist or not
            const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
            if (prototypeDesc) {
                desc = { enumerable: true, configurable: true };
            }
        }
        // if the descriptor not exists or is not configurable
        // just return
        if (!desc || !desc.configurable) {
            return;
        }
        const onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
        if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
            return;
        }
        // A property descriptor cannot have getter/setter and be writable
        // deleting the writable and value properties avoids this error:
        //
        // TypeError: property descriptors must not specify a value or be writable when a
        // getter or setter has been specified
        delete desc.writable;
        delete desc.value;
        const originalDescGet = desc.get;
        const originalDescSet = desc.set;
        // substr(2) cuz 'onclick' -> 'click', etc
        const eventName = prop.substr(2);
        let eventNameSymbol = zoneSymbolEventNames[eventName];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
        }
        desc.set = function (newValue) {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return;
            }
            let previousValue = target[eventNameSymbol];
            if (previousValue) {
                target.removeEventListener(eventName, wrapFn);
            }
            // issue #978, when onload handler was added before loading zone.js
            // we should remove it with originalDescSet
            if (originalDescSet) {
                originalDescSet.apply(target, NULL_ON_PROP_VALUE);
            }
            if (typeof newValue === 'function') {
                target[eventNameSymbol] = newValue;
                target.addEventListener(eventName, wrapFn, false);
            }
            else {
                target[eventNameSymbol] = null;
            }
        };
        // The getter would return undefined for unassigned properties but the default value of an
        // unassigned property is null
        desc.get = function () {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return null;
            }
            const listener = target[eventNameSymbol];
            if (listener) {
                return listener;
            }
            else if (originalDescGet) {
                // result will be null when use inline event attribute,
                // such as <button onclick="func();">OK</button>
                // because the onclick function is internal raw uncompiled handler
                // the onclick will be evaluated when first time event was triggered or
                // the property is accessed, https://github.com/angular/zone.js/issues/525
                // so we should use original native get to retrieve the handler
                let value = originalDescGet && originalDescGet.call(this);
                if (value) {
                    desc.set.call(this, value);
                    if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                        target.removeAttribute(prop);
                    }
                    return value;
                }
            }
            return null;
        };
        ObjectDefineProperty(obj, prop, desc);
        obj[onPropPatchedSymbol] = true;
    }
    function patchOnProperties(obj, properties, prototype) {
        if (properties) {
            for (let i = 0; i < properties.length; i++) {
                patchProperty(obj, 'on' + properties[i], prototype);
            }
        }
        else {
            const onProperties = [];
            for (const prop in obj) {
                if (prop.substr(0, 2) == 'on') {
                    onProperties.push(prop);
                }
            }
            for (let j = 0; j < onProperties.length; j++) {
                patchProperty(obj, onProperties[j], prototype);
            }
        }
    }
    const originalInstanceKey = zoneSymbol('originalInstance');
    // wrap some native API on `window`
    function patchClass(className) {
        const OriginalClass = _global[className];
        if (!OriginalClass)
            return;
        // keep original class in global
        _global[zoneSymbol(className)] = OriginalClass;
        _global[className] = function () {
            const a = bindArguments(arguments, className);
            switch (a.length) {
                case 0:
                    this[originalInstanceKey] = new OriginalClass();
                    break;
                case 1:
                    this[originalInstanceKey] = new OriginalClass(a[0]);
                    break;
                case 2:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                    break;
                case 3:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                    break;
                case 4:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                    break;
                default:
                    throw new Error('Arg list too long.');
            }
        };
        // attach original delegate to patched function
        attachOriginToPatched(_global[className], OriginalClass);
        const instance = new OriginalClass(function () { });
        let prop;
        for (prop in instance) {
            // https://bugs.webkit.org/show_bug.cgi?id=44721
            if (className === 'XMLHttpRequest' && prop === 'responseBlob')
                continue;
            (function (prop) {
                if (typeof instance[prop] === 'function') {
                    _global[className].prototype[prop] = function () {
                        return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                    };
                }
                else {
                    ObjectDefineProperty(_global[className].prototype, prop, {
                        set: function (fn) {
                            if (typeof fn === 'function') {
                                this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                                // keep callback in wrapped function so we can
                                // use it in Function.prototype.toString to return
                                // the native one.
                                attachOriginToPatched(this[originalInstanceKey][prop], fn);
                            }
                            else {
                                this[originalInstanceKey][prop] = fn;
                            }
                        },
                        get: function () { return this[originalInstanceKey][prop]; }
                    });
                }
            }(prop));
        }
        for (prop in OriginalClass) {
            if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
                _global[className][prop] = OriginalClass[prop];
            }
        }
    }
    function copySymbolProperties(src, dest) {
        if (typeof Object.getOwnPropertySymbols !== 'function') {
            return;
        }
        const symbols = Object.getOwnPropertySymbols(src);
        symbols.forEach((symbol) => {
            const desc = Object.getOwnPropertyDescriptor(src, symbol);
            Object.defineProperty(dest, symbol, {
                get: function () { return src[symbol]; },
                set: function (value) {
                    if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                        // if src[symbol] is not writable or not have a setter, just return
                        return;
                    }
                    src[symbol] = value;
                },
                enumerable: desc ? desc.enumerable : true,
                configurable: desc ? desc.configurable : true
            });
        });
    }
    let shouldCopySymbolProperties = false;
    function patchMethod(target, name, patchFn) {
        let proto = target;
        while (proto && !proto.hasOwnProperty(name)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && target[name]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = target;
        }
        const delegateName = zoneSymbol(name);
        let delegate = null;
        if (proto && !(delegate = proto[delegateName])) {
            delegate = proto[delegateName] = proto[name];
            // check whether proto[name] is writable
            // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
            const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
            if (isPropertyWritable(desc)) {
                const patchDelegate = patchFn(delegate, delegateName, name);
                proto[name] = function () { return patchDelegate(this, arguments); };
                attachOriginToPatched(proto[name], delegate);
                if (shouldCopySymbolProperties) {
                    copySymbolProperties(delegate, proto[name]);
                }
            }
        }
        return delegate;
    }
    // TODO: @JiaLiPassion, support cancel task later if necessary
    function patchMacroTask(obj, funcName, metaCreator) {
        let setNative = null;
        function scheduleTask(task) {
            const data = task.data;
            data.args[data.cbIdx] = function () { task.invoke.apply(this, arguments); };
            setNative.apply(data.target, data.args);
            return task;
        }
        setNative = patchMethod(obj, funcName, (delegate) => function (self, args) {
            const meta = metaCreator(self, args);
            if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
                return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(self, args);
            }
        });
    }
    function attachOriginToPatched(patched, original) {
        patched[zoneSymbol('OriginalDelegate')] = original;
    }
    let isDetectedIEOrEdge = false;
    let ieOrEdge = false;
    function isIE() {
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
                return true;
            }
        }
        catch (error) {
        }
        return false;
    }
    function isIEOrEdge() {
        if (isDetectedIEOrEdge) {
            return ieOrEdge;
        }
        isDetectedIEOrEdge = true;
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
                ieOrEdge = true;
            }
        }
        catch (error) {
        }
        return ieOrEdge;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // override Function.prototype.toString to make zone.js patched function
    // look like native function
    Zone.__load_patch('toString', (global) => {
        // patch Func.prototype.toString to let them look like native
        const originalFunctionToString = Function.prototype.toString;
        const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
        const PROMISE_SYMBOL = zoneSymbol('Promise');
        const ERROR_SYMBOL = zoneSymbol('Error');
        const newFunctionToString = function toString() {
            if (typeof this === 'function') {
                const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
                if (originalDelegate) {
                    if (typeof originalDelegate === 'function') {
                        return originalFunctionToString.call(originalDelegate);
                    }
                    else {
                        return Object.prototype.toString.call(originalDelegate);
                    }
                }
                if (this === Promise) {
                    const nativePromise = global[PROMISE_SYMBOL];
                    if (nativePromise) {
                        return originalFunctionToString.call(nativePromise);
                    }
                }
                if (this === Error) {
                    const nativeError = global[ERROR_SYMBOL];
                    if (nativeError) {
                        return originalFunctionToString.call(nativeError);
                    }
                }
            }
            return originalFunctionToString.call(this);
        };
        newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
        Function.prototype.toString = newFunctionToString;
        // patch Object.prototype.toString to let them look like native
        const originalObjectToString = Object.prototype.toString;
        const PROMISE_OBJECT_TO_STRING = '[object Promise]';
        Object.prototype.toString = function () {
            if (this instanceof Promise) {
                return PROMISE_OBJECT_TO_STRING;
            }
            return originalObjectToString.call(this);
        };
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let passiveSupported = false;
    if (typeof window !== 'undefined') {
        try {
            const options = Object.defineProperty({}, 'passive', { get: function () { passiveSupported = true; } });
            window.addEventListener('test', options, options);
            window.removeEventListener('test', options, options);
        }
        catch (err) {
            passiveSupported = false;
        }
    }
    // an identifier to tell ZoneTask do not create a new invoke closure
    const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
        useG: true
    };
    const zoneSymbolEventNames$1 = {};
    const globalSources = {};
    const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
    const IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
    function prepareEventNames(eventName, eventNameToString) {
        const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
        const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
        const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    function patchEventTarget(_global, apis, patchOptions) {
        const ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
        const REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
        const LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
        const REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
        const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
        const ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
        const PREPEND_EVENT_LISTENER = 'prependListener';
        const PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
        const invokeTask = function (task, target, event) {
            // for better performance, check isRemoved which is set
            // by removeEventListener
            if (task.isRemoved) {
                return;
            }
            const delegate = task.callback;
            if (typeof delegate === 'object' && delegate.handleEvent) {
                // create the bind version of handleEvent when invoke
                task.callback = (event) => delegate.handleEvent(event);
                task.originalDelegate = delegate;
            }
            // invoke static task.invoke
            task.invoke(task, target, [event]);
            const options = task.options;
            if (options && typeof options === 'object' && options.once) {
                // if options.once is true, after invoke once remove listener here
                // only browser need to do this, nodejs eventEmitter will cal removeListener
                // inside EventEmitter.once
                const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = false
        const globalZoneAwareCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = true
        const globalZoneAwareCaptureCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        function patchEventTargetMethods(obj, patchOptions) {
            if (!obj) {
                return false;
            }
            let useGlobalCallback = true;
            if (patchOptions && patchOptions.useG !== undefined) {
                useGlobalCallback = patchOptions.useG;
            }
            const validateHandler = patchOptions && patchOptions.vh;
            let checkDuplicate = true;
            if (patchOptions && patchOptions.chkDup !== undefined) {
                checkDuplicate = patchOptions.chkDup;
            }
            let returnTarget = false;
            if (patchOptions && patchOptions.rt !== undefined) {
                returnTarget = patchOptions.rt;
            }
            let proto = obj;
            while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
                proto = ObjectGetPrototypeOf(proto);
            }
            if (!proto && obj[ADD_EVENT_LISTENER]) {
                // somehow we did not find it, but we can see it. This happens on IE for Window properties.
                proto = obj;
            }
            if (!proto) {
                return false;
            }
            if (proto[zoneSymbolAddEventListener]) {
                return false;
            }
            const eventNameToString = patchOptions && patchOptions.eventNameToString;
            // a shared global taskData to pass data for scheduleEventTask
            // so we do not need to create a new object just for pass some data
            const taskData = {};
            const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
            const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
                proto[REMOVE_EVENT_LISTENER];
            const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
                proto[LISTENERS_EVENT_LISTENER];
            const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
                proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
            let nativePrependEventListener;
            if (patchOptions && patchOptions.prepend) {
                nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                    proto[patchOptions.prepend];
            }
            /**
             * This util function will build an option object with passive option
             * to handle all possible input from the user.
             */
            function buildEventListenerOptions(options, passive) {
                if (!passiveSupported && typeof options === 'object' && options) {
                    // doesn't support passive but user want to pass an object as options.
                    // this will not work on some old browser, so we just pass a boolean
                    // as useCapture parameter
                    return !!options.capture;
                }
                if (!passiveSupported || !passive) {
                    return options;
                }
                if (typeof options === 'boolean') {
                    return { capture: options, passive: true };
                }
                if (!options) {
                    return { passive: true };
                }
                if (typeof options === 'object' && options.passive !== false) {
                    return Object.assign(Object.assign({}, options), { passive: true });
                }
                return options;
            }
            const customScheduleGlobal = function (task) {
                // if there is already a task for the eventName + capture,
                // just return, because we use the shared globalZoneAwareCallback here.
                if (taskData.isExisting) {
                    return;
                }
                return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
            };
            const customCancelGlobal = function (task) {
                // if task is not marked as isRemoved, this call is directly
                // from Zone.prototype.cancelTask, we should remove the task
                // from tasksList of target first
                if (!task.isRemoved) {
                    const symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                    let symbolEventName;
                    if (symbolEventNames) {
                        symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                    }
                    const existingTasks = symbolEventName && task.target[symbolEventName];
                    if (existingTasks) {
                        for (let i = 0; i < existingTasks.length; i++) {
                            const existingTask = existingTasks[i];
                            if (existingTask === task) {
                                existingTasks.splice(i, 1);
                                // set isRemoved to data for faster invokeTask check
                                task.isRemoved = true;
                                if (existingTasks.length === 0) {
                                    // all tasks for the eventName + capture have gone,
                                    // remove globalZoneAwareCallback and remove the task cache from target
                                    task.allRemoved = true;
                                    task.target[symbolEventName] = null;
                                }
                                break;
                            }
                        }
                    }
                }
                // if all tasks for the eventName + capture have gone,
                // we will really remove the global event callback,
                // if not, return
                if (!task.allRemoved) {
                    return;
                }
                return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
            };
            const customScheduleNonGlobal = function (task) {
                return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customSchedulePrepend = function (task) {
                return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customCancelNonGlobal = function (task) {
                return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
            };
            const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
            const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
            const compareTaskCallbackVsDelegate = function (task, delegate) {
                const typeOfDelegate = typeof delegate;
                return (typeOfDelegate === 'function' && task.callback === delegate) ||
                    (typeOfDelegate === 'object' && task.originalDelegate === delegate);
            };
            const compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
            const blackListedEvents = Zone[zoneSymbol('BLACK_LISTED_EVENTS')];
            const passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];
            const makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget = false, prepend = false) {
                return function () {
                    const target = this || _global;
                    let eventName = arguments[0];
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    let delegate = arguments[1];
                    if (!delegate) {
                        return nativeListener.apply(this, arguments);
                    }
                    if (isNode && eventName === 'uncaughtException') {
                        // don't patch uncaughtException of nodejs to prevent endless loop
                        return nativeListener.apply(this, arguments);
                    }
                    // don't create the bind delegate function for handleEvent
                    // case here to improve addEventListener performance
                    // we will create the bind delegate when invoke
                    let isHandleEvent = false;
                    if (typeof delegate !== 'function') {
                        if (!delegate.handleEvent) {
                            return nativeListener.apply(this, arguments);
                        }
                        isHandleEvent = true;
                    }
                    if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                        return;
                    }
                    const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                    const options = buildEventListenerOptions(arguments[2], passive);
                    if (blackListedEvents) {
                        // check black list
                        for (let i = 0; i < blackListedEvents.length; i++) {
                            if (eventName === blackListedEvents[i]) {
                                if (passive) {
                                    return nativeListener.call(target, eventName, delegate, options);
                                }
                                else {
                                    return nativeListener.apply(this, arguments);
                                }
                            }
                        }
                    }
                    const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                    const once = options && typeof options === 'object' ? options.once : false;
                    const zone = Zone.current;
                    let symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (!symbolEventNames) {
                        prepareEventNames(eventName, eventNameToString);
                        symbolEventNames = zoneSymbolEventNames$1[eventName];
                    }
                    const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                    let existingTasks = target[symbolEventName];
                    let isExisting = false;
                    if (existingTasks) {
                        // already have task registered
                        isExisting = true;
                        if (checkDuplicate) {
                            for (let i = 0; i < existingTasks.length; i++) {
                                if (compare(existingTasks[i], delegate)) {
                                    // same callback, same capture, same event name, just return
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        existingTasks = target[symbolEventName] = [];
                    }
                    let source;
                    const constructorName = target.constructor['name'];
                    const targetSource = globalSources[constructorName];
                    if (targetSource) {
                        source = targetSource[eventName];
                    }
                    if (!source) {
                        source = constructorName + addSource +
                            (eventNameToString ? eventNameToString(eventName) : eventName);
                    }
                    // do not create a new object as task.data to pass those things
                    // just use the global shared one
                    taskData.options = options;
                    if (once) {
                        // if addEventListener with once options, we don't pass it to
                        // native addEventListener, instead we keep the once setting
                        // and handle ourselves.
                        taskData.options.once = false;
                    }
                    taskData.target = target;
                    taskData.capture = capture;
                    taskData.eventName = eventName;
                    taskData.isExisting = isExisting;
                    const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                    // keep taskData into data to allow onScheduleEventTask to access the task information
                    if (data) {
                        data.taskData = taskData;
                    }
                    const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                    // should clear taskData.target to avoid memory leak
                    // issue, https://github.com/angular/angular/issues/20442
                    taskData.target = null;
                    // need to clear up taskData because it is a global object
                    if (data) {
                        data.taskData = null;
                    }
                    // have to save those information to task in case
                    // application may call task.zone.cancelTask() directly
                    if (once) {
                        options.once = true;
                    }
                    if (!(!passiveSupported && typeof task.options === 'boolean')) {
                        // if not support passive, and we pass an option object
                        // to addEventListener, we should save the options to task
                        task.options = options;
                    }
                    task.target = target;
                    task.capture = capture;
                    task.eventName = eventName;
                    if (isHandleEvent) {
                        // save original delegate for compare to check duplicate
                        task.originalDelegate = delegate;
                    }
                    if (!prepend) {
                        existingTasks.push(task);
                    }
                    else {
                        existingTasks.unshift(task);
                    }
                    if (returnTarget) {
                        return target;
                    }
                };
            };
            proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
            if (nativePrependEventListener) {
                proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
            }
            proto[REMOVE_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const options = arguments[2];
                const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                const delegate = arguments[1];
                if (!delegate) {
                    return nativeRemoveEventListener.apply(this, arguments);
                }
                if (validateHandler &&
                    !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                    return;
                }
                const symbolEventNames = zoneSymbolEventNames$1[eventName];
                let symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                const existingTasks = symbolEventName && target[symbolEventName];
                if (existingTasks) {
                    for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (compare(existingTask, delegate)) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            existingTask.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                existingTask.allRemoved = true;
                                target[symbolEventName] = null;
                                // in the target, we have an event listener which is added by on_property
                                // such as target.onclick = function() {}, so we need to clear this internal
                                // property too if all delegates all removed
                                if (typeof eventName === 'string') {
                                    const onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                    target[onPropertySymbol] = null;
                                }
                            }
                            existingTask.zone.cancelTask(existingTask);
                            if (returnTarget) {
                                return target;
                            }
                            return;
                        }
                    }
                }
                // issue 930, didn't find the event name or callback
                // from zone kept existingTasks, the callback maybe
                // added outside of zone, we need to call native removeEventListener
                // to try to remove it.
                return nativeRemoveEventListener.apply(this, arguments);
            };
            proto[LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const listeners = [];
                const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];
                    let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    listeners.push(delegate);
                }
                return listeners;
            };
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (!eventName) {
                    const keys = Object.keys(target);
                    for (let i = 0; i < keys.length; i++) {
                        const prop = keys[i];
                        const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                        let evtName = match && match[1];
                        // in nodejs EventEmitter, removeListener event is
                        // used for monitoring the removeListener call,
                        // so just keep removeListener eventListener until
                        // all other eventListeners are removed
                        if (evtName && evtName !== 'removeListener') {
                            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                        }
                    }
                    // remove removeListener listener finally
                    this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
                }
                else {
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    const symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (symbolEventNames) {
                        const symbolEventName = symbolEventNames[FALSE_STR];
                        const symbolCaptureEventName = symbolEventNames[TRUE_STR];
                        const tasks = target[symbolEventName];
                        const captureTasks = target[symbolCaptureEventName];
                        if (tasks) {
                            const removeTasks = tasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                        if (captureTasks) {
                            const removeTasks = captureTasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                    }
                }
                if (returnTarget) {
                    return this;
                }
            };
            // for native toString patch
            attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
            attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
            if (nativeRemoveAllListeners) {
                attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
            }
            if (nativeListeners) {
                attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
            }
            return true;
        }
        let results = [];
        for (let i = 0; i < apis.length; i++) {
            results[i] = patchEventTargetMethods(apis[i], patchOptions);
        }
        return results;
    }
    function findEventTasks(target, eventName) {
        if (!eventName) {
            const foundTasks = [];
            for (let prop in target) {
                const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                let evtName = match && match[1];
                if (evtName && (!eventName || evtName === eventName)) {
                    const tasks = target[prop];
                    if (tasks) {
                        for (let i = 0; i < tasks.length; i++) {
                            foundTasks.push(tasks[i]);
                        }
                    }
                }
            }
            return foundTasks;
        }
        let symbolEventName = zoneSymbolEventNames$1[eventName];
        if (!symbolEventName) {
            prepareEventNames(eventName);
            symbolEventName = zoneSymbolEventNames$1[eventName];
        }
        const captureFalseTasks = target[symbolEventName[FALSE_STR]];
        const captureTrueTasks = target[symbolEventName[TRUE_STR]];
        if (!captureFalseTasks) {
            return captureTrueTasks ? captureTrueTasks.slice() : [];
        }
        else {
            return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) :
                captureFalseTasks.slice();
        }
    }
    function patchEventPrototype(global, api) {
        const Event = global['Event'];
        if (Event && Event.prototype) {
            api.patchMethod(Event.prototype, 'stopImmediatePropagation', (delegate) => function (self, args) {
                self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
                // we need to call the native stopImmediatePropagation
                // in case in some hybrid application, some part of
                // application will be controlled by zone, some are not
                delegate && delegate.apply(self, args);
            });
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCallbacks(api, target, targetName, method, callbacks) {
        const symbol = Zone.__symbol__(method);
        if (target[symbol]) {
            return;
        }
        const nativeDelegate = target[symbol] = target[method];
        target[method] = function (name, opts, options) {
            if (opts && opts.prototype) {
                callbacks.forEach(function (callback) {
                    const source = `${targetName}.${method}::` + callback;
                    const prototype = opts.prototype;
                    if (prototype.hasOwnProperty(callback)) {
                        const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                        if (descriptor && descriptor.value) {
                            descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                            api._redefineProperty(opts.prototype, callback, descriptor);
                        }
                        else if (prototype[callback]) {
                            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                        }
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                });
            }
            return nativeDelegate.call(target, name, opts, options);
        };
        api.attachOriginToPatched(target[method], nativeDelegate);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const globalEventHandlersEventNames = [
        'abort',
        'animationcancel',
        'animationend',
        'animationiteration',
        'auxclick',
        'beforeinput',
        'blur',
        'cancel',
        'canplay',
        'canplaythrough',
        'change',
        'compositionstart',
        'compositionupdate',
        'compositionend',
        'cuechange',
        'click',
        'close',
        'contextmenu',
        'curechange',
        'dblclick',
        'drag',
        'dragend',
        'dragenter',
        'dragexit',
        'dragleave',
        'dragover',
        'drop',
        'durationchange',
        'emptied',
        'ended',
        'error',
        'focus',
        'focusin',
        'focusout',
        'gotpointercapture',
        'input',
        'invalid',
        'keydown',
        'keypress',
        'keyup',
        'load',
        'loadstart',
        'loadeddata',
        'loadedmetadata',
        'lostpointercapture',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mousewheel',
        'orientationchange',
        'pause',
        'play',
        'playing',
        'pointercancel',
        'pointerdown',
        'pointerenter',
        'pointerleave',
        'pointerlockchange',
        'mozpointerlockchange',
        'webkitpointerlockerchange',
        'pointerlockerror',
        'mozpointerlockerror',
        'webkitpointerlockerror',
        'pointermove',
        'pointout',
        'pointerover',
        'pointerup',
        'progress',
        'ratechange',
        'reset',
        'resize',
        'scroll',
        'seeked',
        'seeking',
        'select',
        'selectionchange',
        'selectstart',
        'show',
        'sort',
        'stalled',
        'submit',
        'suspend',
        'timeupdate',
        'volumechange',
        'touchcancel',
        'touchmove',
        'touchstart',
        'touchend',
        'transitioncancel',
        'transitionend',
        'waiting',
        'wheel'
    ];
    const documentEventNames = [
        'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
        'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
        'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
        'visibilitychange', 'resume'
    ];
    const windowEventNames = [
        'absolutedeviceorientation',
        'afterinput',
        'afterprint',
        'appinstalled',
        'beforeinstallprompt',
        'beforeprint',
        'beforeunload',
        'devicelight',
        'devicemotion',
        'deviceorientation',
        'deviceorientationabsolute',
        'deviceproximity',
        'hashchange',
        'languagechange',
        'message',
        'mozbeforepaint',
        'offline',
        'online',
        'paint',
        'pageshow',
        'pagehide',
        'popstate',
        'rejectionhandled',
        'storage',
        'unhandledrejection',
        'unload',
        'userproximity',
        'vrdisplayconnected',
        'vrdisplaydisconnected',
        'vrdisplaypresentchange'
    ];
    const htmlElementEventNames = [
        'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
        'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
        'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
    ];
    const mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
    const ieElementEventNames = [
        'activate',
        'afterupdate',
        'ariarequest',
        'beforeactivate',
        'beforedeactivate',
        'beforeeditfocus',
        'beforeupdate',
        'cellchange',
        'controlselect',
        'dataavailable',
        'datasetchanged',
        'datasetcomplete',
        'errorupdate',
        'filterchange',
        'layoutcomplete',
        'losecapture',
        'move',
        'moveend',
        'movestart',
        'propertychange',
        'resizeend',
        'resizestart',
        'rowenter',
        'rowexit',
        'rowsdelete',
        'rowsinserted',
        'command',
        'compassneedscalibration',
        'deactivate',
        'help',
        'mscontentzoom',
        'msmanipulationstatechanged',
        'msgesturechange',
        'msgesturedoubletap',
        'msgestureend',
        'msgesturehold',
        'msgesturestart',
        'msgesturetap',
        'msgotpointercapture',
        'msinertiastart',
        'mslostpointercapture',
        'mspointercancel',
        'mspointerdown',
        'mspointerenter',
        'mspointerhover',
        'mspointerleave',
        'mspointermove',
        'mspointerout',
        'mspointerover',
        'mspointerup',
        'pointerout',
        'mssitemodejumplistitemremoved',
        'msthumbnailclick',
        'stop',
        'storagecommit'
    ];
    const webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
    const formEventNames = ['autocomplete', 'autocompleteerror'];
    const detailEventNames = ['toggle'];
    const frameEventNames = ['load'];
    const frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
    const marqueeEventNames = ['bounce', 'finish', 'start'];
    const XMLHttpRequestEventNames = [
        'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
        'readystatechange'
    ];
    const IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
    const websocketEventNames = ['close', 'error', 'open', 'message'];
    const workerEventNames = ['error', 'message'];
    const eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
    function filterProperties(target, onProperties, ignoreProperties) {
        if (!ignoreProperties || ignoreProperties.length === 0) {
            return onProperties;
        }
        const tip = ignoreProperties.filter(ip => ip.target === target);
        if (!tip || tip.length === 0) {
            return onProperties;
        }
        const targetIgnoreProperties = tip[0].ignoreProperties;
        return onProperties.filter(op => targetIgnoreProperties.indexOf(op) === -1);
    }
    function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
        // check whether target is available, sometimes target will be undefined
        // because different browser or some 3rd party plugin.
        if (!target) {
            return;
        }
        const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
        patchOnProperties(target, filteredProperties, prototype);
    }
    function propertyDescriptorPatch(api, _global) {
        if (isNode && !isMix) {
            return;
        }
        if (Zone[api.symbol('patchEvents')]) {
            // events are already been patched by legacy patch.
            return;
        }
        const supportsWebSocket = typeof WebSocket !== 'undefined';
        const ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            const internalWindow = window;
            const ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            const HTMLMarqueeElement = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement) {
                patchFilteredProperties(HTMLMarqueeElement.prototype, marqueeEventNames, ignoreProperties);
            }
            const Worker = internalWindow['Worker'];
            if (Worker) {
                patchFilteredProperties(Worker.prototype, workerEventNames, ignoreProperties);
            }
        }
        const XMLHttpRequest = _global['XMLHttpRequest'];
        if (XMLHttpRequest) {
            // XMLHttpRequest is not available in ServiceWorker, so we need to check here
            patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        const XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('util', (global, Zone, api) => {
        api.patchOnProperties = patchOnProperties;
        api.patchMethod = patchMethod;
        api.bindArguments = bindArguments;
        api.patchMacroTask = patchMacroTask;
        // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
        // define which events will not be patched by `Zone.js`.
        // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
        // the name consistent with angular repo.
        // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
        // backwards compatibility.
        const SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
        const SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
        if (global[SYMBOL_UNPATCHED_EVENTS]) {
            global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
        }
        if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
            Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
                global[SYMBOL_BLACK_LISTED_EVENTS];
        }
        api.patchEventPrototype = patchEventPrototype;
        api.patchEventTarget = patchEventTarget;
        api.isIEOrEdge = isIEOrEdge;
        api.ObjectDefineProperty = ObjectDefineProperty;
        api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
        api.ObjectCreate = ObjectCreate;
        api.ArraySlice = ArraySlice;
        api.patchClass = patchClass;
        api.wrapWithCurrentZone = wrapWithCurrentZone;
        api.filterProperties = filterProperties;
        api.attachOriginToPatched = attachOriginToPatched;
        api._redefineProperty = Object.defineProperty;
        api.patchCallbacks = patchCallbacks;
        api.getGlobalObjects = () => ({ globalSources, zoneSymbolEventNames: zoneSymbolEventNames$1, eventNames, isBrowser, isMix, isNode, TRUE_STR,
            FALSE_STR, ZONE_SYMBOL_PREFIX, ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR });
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const taskSymbol = zoneSymbol('zoneTask');
    function patchTimer(window, setName, cancelName, nameSuffix) {
        let setNative = null;
        let clearNative = null;
        setName += nameSuffix;
        cancelName += nameSuffix;
        const tasksByHandleId = {};
        function scheduleTask(task) {
            const data = task.data;
            function timer() {
                try {
                    task.invoke.apply(this, arguments);
                }
                finally {
                    // issue-934, task will be cancelled
                    // even it is a periodic task such as
                    // setInterval
                    if (!(task.data && task.data.isPeriodic)) {
                        if (typeof data.handleId === 'number') {
                            // in non-nodejs env, we remove timerId
                            // from local cache
                            delete tasksByHandleId[data.handleId];
                        }
                        else if (data.handleId) {
                            // Node returns complex objects as handleIds
                            // we remove task reference from timer object
                            data.handleId[taskSymbol] = null;
                        }
                    }
                }
            }
            data.args[0] = timer;
            data.handleId = setNative.apply(window, data.args);
            return task;
        }
        function clearTask(task) { return clearNative(task.data.handleId); }
        setNative =
            patchMethod(window, setName, (delegate) => function (self, args) {
                if (typeof args[0] === 'function') {
                    const options = {
                        isPeriodic: nameSuffix === 'Interval',
                        delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                            undefined,
                        args: args
                    };
                    const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                    if (!task) {
                        return task;
                    }
                    // Node.js must additionally support the ref and unref functions.
                    const handle = task.data.handleId;
                    if (typeof handle === 'number') {
                        // for non nodejs env, we save handleId: task
                        // mapping in local cache for clearTimeout
                        tasksByHandleId[handle] = task;
                    }
                    else if (handle) {
                        // for nodejs env, we save task
                        // reference in timerId Object for clearTimeout
                        handle[taskSymbol] = task;
                    }
                    // check whether handle is null, because some polyfill or browser
                    // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                    if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                        typeof handle.unref === 'function') {
                        task.ref = handle.ref.bind(handle);
                        task.unref = handle.unref.bind(handle);
                    }
                    if (typeof handle === 'number' || handle) {
                        return handle;
                    }
                    return task;
                }
                else {
                    // cause an error by calling it directly.
                    return delegate.apply(window, args);
                }
            });
        clearNative =
            patchMethod(window, cancelName, (delegate) => function (self, args) {
                const id = args[0];
                let task;
                if (typeof id === 'number') {
                    // non nodejs env.
                    task = tasksByHandleId[id];
                }
                else {
                    // nodejs env.
                    task = id && id[taskSymbol];
                    // other environments.
                    if (!task) {
                        task = id;
                    }
                }
                if (task && typeof task.type === 'string') {
                    if (task.state !== 'notScheduled' &&
                        (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                        if (typeof id === 'number') {
                            delete tasksByHandleId[id];
                        }
                        else if (id) {
                            id[taskSymbol] = null;
                        }
                        // Do not cancel already canceled functions
                        task.zone.cancelTask(task);
                    }
                }
                else {
                    // cause an error by calling it directly.
                    delegate.apply(window, args);
                }
            });
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCustomElements(_global, api) {
        const { isBrowser, isMix } = api.getGlobalObjects();
        if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
            return;
        }
        const callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
        api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function eventTargetPatch(_global, api) {
        if (Zone[api.symbol('patchEventTarget')]) {
            // EventTarget is already patched.
            return;
        }
        const { eventNames, zoneSymbolEventNames, TRUE_STR, FALSE_STR, ZONE_SYMBOL_PREFIX } = api.getGlobalObjects();
        //  predefine all __zone_symbol__ + eventName + true/false string
        for (let i = 0; i < eventNames.length; i++) {
            const eventName = eventNames[i];
            const falseEventName = eventName + FALSE_STR;
            const trueEventName = eventName + TRUE_STR;
            const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
            const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {};
            zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        const EVENT_TARGET = _global['EventTarget'];
        if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
            return;
        }
        api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
        return true;
    }
    function patchEvent(global, api) {
        api.patchEventPrototype(global, api);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('legacy', (global) => {
        const legacyPatch = global[Zone.__symbol__('legacyPatch')];
        if (legacyPatch) {
            legacyPatch();
        }
    });
    Zone.__load_patch('timers', (global) => {
        const set = 'set';
        const clear = 'clear';
        patchTimer(global, set, clear, 'Timeout');
        patchTimer(global, set, clear, 'Interval');
        patchTimer(global, set, clear, 'Immediate');
    });
    Zone.__load_patch('requestAnimationFrame', (global) => {
        patchTimer(global, 'request', 'cancel', 'AnimationFrame');
        patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
        patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
    });
    Zone.__load_patch('blocking', (global, Zone) => {
        const blockingMethods = ['alert', 'prompt', 'confirm'];
        for (let i = 0; i < blockingMethods.length; i++) {
            const name = blockingMethods[i];
            patchMethod(global, name, (delegate, symbol, name) => {
                return function (s, args) {
                    return Zone.current.run(delegate, global, args, name);
                };
            });
        }
    });
    Zone.__load_patch('EventTarget', (global, Zone, api) => {
        patchEvent(global, api);
        eventTargetPatch(global, api);
        // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
        const XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
            api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
        }
        patchClass('MutationObserver');
        patchClass('WebKitMutationObserver');
        patchClass('IntersectionObserver');
        patchClass('FileReader');
    });
    Zone.__load_patch('on_property', (global, Zone, api) => {
        propertyDescriptorPatch(api, global);
    });
    Zone.__load_patch('customElements', (global, Zone, api) => {
        patchCustomElements(global, api);
    });
    Zone.__load_patch('XHR', (global, Zone) => {
        // Treat XMLHttpRequest as a macrotask.
        patchXHR(global);
        const XHR_TASK = zoneSymbol('xhrTask');
        const XHR_SYNC = zoneSymbol('xhrSync');
        const XHR_LISTENER = zoneSymbol('xhrListener');
        const XHR_SCHEDULED = zoneSymbol('xhrScheduled');
        const XHR_URL = zoneSymbol('xhrURL');
        const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
        function patchXHR(window) {
            const XMLHttpRequest = window['XMLHttpRequest'];
            if (!XMLHttpRequest) {
                // XMLHttpRequest is not available in service worker
                return;
            }
            const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
            function findPendingTask(target) { return target[XHR_TASK]; }
            let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
            let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            if (!oriAddListener) {
                const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget) {
                    const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                    oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
            }
            const READY_STATE_CHANGE = 'readystatechange';
            const SCHEDULED = 'scheduled';
            function scheduleTask(task) {
                const data = task.data;
                const target = data.target;
                target[XHR_SCHEDULED] = false;
                target[XHR_ERROR_BEFORE_SCHEDULED] = false;
                // remove existing event listener
                const listener = target[XHR_LISTENER];
                if (!oriAddListener) {
                    oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
                if (listener) {
                    oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                }
                const newListener = target[XHR_LISTENER] = () => {
                    if (target.readyState === target.DONE) {
                        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                        // readyState=4 multiple times, so we need to check task state here
                        if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            // check whether the xhr has registered onload listener
                            // if that is the case, the task should invoke after all
                            // onload listeners finish.
                            const loadTasks = target[Zone.__symbol__('loadfalse')];
                            if (loadTasks && loadTasks.length > 0) {
                                const oriInvoke = task.invoke;
                                task.invoke = function () {
                                    // need to load the tasks again, because in other
                                    // load listener, they may remove themselves
                                    const loadTasks = target[Zone.__symbol__('loadfalse')];
                                    for (let i = 0; i < loadTasks.length; i++) {
                                        if (loadTasks[i] === task) {
                                            loadTasks.splice(i, 1);
                                        }
                                    }
                                    if (!data.aborted && task.state === SCHEDULED) {
                                        oriInvoke.call(task);
                                    }
                                };
                                loadTasks.push(task);
                            }
                            else {
                                task.invoke();
                            }
                        }
                        else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                            // error occurs when xhr.send()
                            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                        }
                    }
                };
                oriAddListener.call(target, READY_STATE_CHANGE, newListener);
                const storedTask = target[XHR_TASK];
                if (!storedTask) {
                    target[XHR_TASK] = task;
                }
                sendNative.apply(target, data.args);
                target[XHR_SCHEDULED] = true;
                return task;
            }
            function placeholderCallback() { }
            function clearTask(task) {
                const data = task.data;
                // Note - ideally, we would call data.target.removeEventListener here, but it's too late
                // to prevent it from firing. So instead, we store info for the event listener.
                data.aborted = true;
                return abortNative.apply(data.target, data.args);
            }
            const openNative = patchMethod(XMLHttpRequestPrototype, 'open', () => function (self, args) {
                self[XHR_SYNC] = args[2] == false;
                self[XHR_URL] = args[1];
                return openNative.apply(self, args);
            });
            const XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
            const fetchTaskAborting = zoneSymbol('fetchTaskAborting');
            const fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
            const sendNative = patchMethod(XMLHttpRequestPrototype, 'send', () => function (self, args) {
                if (Zone.current[fetchTaskScheduling] === true) {
                    // a fetch is scheduling, so we are using xhr to polyfill fetch
                    // and because we already schedule macroTask for fetch, we should
                    // not schedule a macroTask for xhr again
                    return sendNative.apply(self, args);
                }
                if (self[XHR_SYNC]) {
                    // if the XHR is sync there is no task to schedule, just execute the code.
                    return sendNative.apply(self, args);
                }
                else {
                    const options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                    const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                    if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                        task.state === SCHEDULED) {
                        // xhr request throw error when send
                        // we should invoke task instead of leaving a scheduled
                        // pending macroTask
                        task.invoke();
                    }
                }
            });
            const abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', () => function (self, args) {
                const task = findPendingTask(self);
                if (task && typeof task.type == 'string') {
                    // If the XHR has already completed, do nothing.
                    // If the XHR has already been aborted, do nothing.
                    // Fix #569, call abort multiple times before done will cause
                    // macroTask task count be negative number
                    if (task.cancelFn == null || (task.data && task.data.aborted)) {
                        return;
                    }
                    task.zone.cancelTask(task);
                }
                else if (Zone.current[fetchTaskAborting] === true) {
                    // the abort is called from fetch polyfill, we need to call native abort of XHR.
                    return abortNative.apply(self, args);
                }
                // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
                // task
                // to cancel. Do nothing.
            });
        }
    });
    Zone.__load_patch('geolocation', (global) => {
        /// GEO_LOCATION
        if (global['navigator'] && global['navigator'].geolocation) {
            patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
        }
    });
    Zone.__load_patch('PromiseRejectionEvent', (global, Zone) => {
        // handle unhandled promise rejection
        function findPromiseRejectionHandler(evtName) {
            return function (e) {
                const eventTasks = findEventTasks(global, evtName);
                eventTasks.forEach(eventTask => {
                    // windows has added unhandledrejection event listener
                    // trigger the event listener
                    const PromiseRejectionEvent = global['PromiseRejectionEvent'];
                    if (PromiseRejectionEvent) {
                        const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                        eventTask.invoke(evt);
                    }
                });
            };
        }
        if (global['PromiseRejectionEvent']) {
            Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
                findPromiseRejectionHandler('unhandledrejection');
            Zone[zoneSymbol('rejectionHandledHandler')] =
                findPromiseRejectionHandler('rejectionhandled');
        }
    });

})));


/***/ }),

/***/ "./src/app/Papers/HLAppliedMathsPapers.ts":
/*!************************************************!*\
  !*** ./src/app/Papers/HLAppliedMathsPapers.ts ***!
  \************************************************/
/*! exports provided: HLAppliedMathsPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLAppliedMathsPapers", function() { return HLAppliedMathsPapers; });
const HLAppliedMathsPapers = [
    {
        tipe: "ExamPaper",
        year: "2019",
        link: "https://drive.google.com/open?id=18OalbjR3JV9ShtAQ9_oISxzNbTirr7XO",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        link: "https://drive.google.com/open?id=1TRWWlyQvwZWHQDCj0lKNvjutdVjoMzkp",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        link: "https://drive.google.com/open?id=1kpn9b-SdoL5xjsrfy4S_-6fhXN77EMvg",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        link: "https://drive.google.com/open?id=1QhEUQBwsmtaX8DG2VKQ57b4aKIquayFD",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        link: "https://drive.google.com/open?id=1S9sAIOGg1eKEzB6vw0pHousuYOTH_lYH",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        link: "https://drive.google.com/open?id=1bYR-B85DiVS0pMQbtviH0ERJOxjWnEDd",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        link: "https://drive.google.com/open?id=1wF0LL4FnM8QMIBC-bGmwlmBh7PVvffGw",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        link: "https://drive.google.com/open?id=1cU3_A9Y5CmX2gGZ_M0rORiQdINuPFSiy",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        link: "https://drive.google.com/open?id=16h7Nd-v1XgmljvYSrT6T5OTGkJSgK5qY",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        link: "https://drive.google.com/open?id=1LW5YSeeQfcOjcZSJ7jhArDFdm1C1xeWQ",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        link: "https://drive.google.com/open?id=1o11M8t6Z3-ZiQbUTxTD-RTra_1r0oTXT",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        link: "https://drive.google.com/open?id=1LC1xXWfYFEKSpL1Gy9NRgEFBQxXns0i4",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        link: "https://drive.google.com/open?id=1RNuJDDDYXCyClHQ_uKT5BAJRpqylFjkz",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        link: "https://drive.google.com/open?id=1GmdzZN8FQ44s5YO2x0e2Z_tjuSGUaTSw",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        link: "https://drive.google.com/open?id=1XAKWd89MWtU3RQ5IrUU-jJeHlwj95Bnx",
    },
    {
        tipe: "ExamPaper",
        year: "2004",
        link: "https://drive.google.com/open?id=1kEN4qvQO8uE5wtmYRtdCv3Hr8-N3Nrbs",
    },
    {
        tipe: "ExamPaper",
        year: "2003",
        link: "https://drive.google.com/open?id=1ono2UXJsvr154ZpOMKZyRC0D5DZ2M-Bm",
    },
    {
        tipe: "ExamPaper",
        year: "2002",
        link: "https://drive.google.com/open?id=1vdsO_5trndSHiD2IaasIi890acCNVeik",
    },
    {
        tipe: "ExamPaper",
        year: "2001",
        link: "https://drive.google.com/open?id=1fSgXcOCbGt99WMPtkSc-GPfTceglopXv",
    },
    {
        tipe: "ExamPaper",
        year: "2000",
        link: "https://drive.google.com/open?id=1-XVmnM0gTOUQjWwbBQHaGpy7Ep_O-mBB",
    },
    {
        tipe: "ExamPaper",
        year: "1999",
        link: "https://drive.google.com/open?id=10AO4fAn5AIRcx86RDyjQStEgUukRpgYd",
    },
    {
        tipe: "ExamPaper",
        year: "1998",
        link: "https://drive.google.com/open?id=1wcD_k6mLGpptnr9fuc3zABk61nnmCuFU",
    },
    {
        tipe: "ExamPaper",
        year: "1997",
        link: "https://drive.google.com/open?id=1D4NbHe64YGKxyvbgM8C6gn_xcvncP-sd",
    },
    {
        tipe: "ExamPaper",
        year: "1996",
        link: "https://drive.google.com/open?id=136klzqJ0IEzzCVCHsVwXeZtlM81-NxDv",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=18KB0l8KpNufjrluQnlA9V5ayngyZ3uPy",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=1dcULeEoT0a0DemDfkJqYswPq_lwfFZkR",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1TvlMxMpKcXvz1mSkHuQ_Ij_09lmSrhSx",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1Yjg-QrU7c8NsLETQiTdtRCjCbLFPLB1w",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1HWvLhZtLmxcIP_kkzr88Ljw5X3wbGWse",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1urQzRPVAEFBCxXUChuTBQPOyOFUd2zYd",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=1W_xmlEY8qqIeGadeT0s6_1M_sA0kl5VG",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1o0C-K1OacQQYiMO36STFkn8l6YVhlkVv",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1Ij6tWqmPRjAd-2o4lXUdEogNk_qGrrAK",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=1JH5m2anpflCJXXfBhyVxS6bVQKQOxv8w",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=1RGP3LrCqA6yTVXs1AwYQfrIkz9QB0Kjm",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/open?id=1at91tqXo-8t7qADThV2Adrd8KTIFS88L",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/open?id=1QhvRUotZFM34pDTOFOzxDFoaKBmZSXbd",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/open?id=1-Tli7wfllCZrmq0vBPMSaaydfkzRRzXP",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/open?id=1LaaANcd-INzl2KgZgu51DCMpAhGXH_v4",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        link: "https://drive.google.com/open?id=1DShteCz0kGZSTxolf7HlWFDAKyOKRGli",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        link: "https://drive.google.com/open?id=1huuTmRBVtjYAk2WRg-KnZHj5SBCtTRwp",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        link: "https://drive.google.com/open?id=1zd749H3nyALXKBpEq5hb66fhT3gxdvb6",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        link: "https://drive.google.com/open?id=1YArure4t_LHGYKc5g4RZnPxaGIB1WorE",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLDCGPapers.ts":
/*!***************************************!*\
  !*** ./src/app/Papers/HLDCGPapers.ts ***!
  \***************************************/
/*! exports provided: HLDCGPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLDCGPapers", function() { return HLDCGPapers; });
const HLDCGPapers = [
    {
        tipe: "ExamPaper",
        year: "2019",
        paper: "A",
        link: "https://drive.google.com/open?id=1wkQJiPN5Xyk3FBxcTHkS3p9w2T_p0I2F",
    },
    {
        tipe: "ExamPaper",
        year: "2019",
        paper: "B",
        link: "https://drive.google.com/open?id=1WZOfKeaY6HEcroVGAnLfip62AGaaCuGT",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        paper: "A",
        link: "https://drive.google.com/open?id=1srVwRLRGQq6I_2Q-KX4Vxb3GW8kefQdR",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        paper: "B",
        link: "https://drive.google.com/open?id=1B1IEli_01k902_-WZYYdy4hp25lFMTKJ",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        paper: "A",
        link: "https://drive.google.com/open?id=1PjnX62IOALGoZWhrrCg3scSfpTUCPzC7",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        paper: "B",
        link: "https://drive.google.com/open?id=1Ayf59JXr-s0CKAtpGf_Yuv4Tgif2xEKz",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        paper: "A",
        link: "https://drive.google.com/open?id=1DSpum2Pzqfyn2WeEop9MbUHz9A_TI7Cj",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        paper: "B",
        link: "https://drive.google.com/open?id=12wdNdbezTUILvbQEoDJWG-aVuskoTpvO",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        paper: "A",
        link: "https://drive.google.com/open?id=1hFNANpJGg3orD4xu941qNEJg1uDEQ6EG",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        paper: "B",
        link: "https://drive.google.com/open?id=11B58nHadsP3oF-dbwOMnM8ZEWYVP5zVl",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        paper: "A",
        link: "https://drive.google.com/open?id=1-HCDnnrhnz19uyzJRpTmbKBcfhZXgxAt",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        paper: "B",
        link: "https://drive.google.com/open?id=1is5cSeXVDti0cf8mYSFvG7m7aXcHvMk4",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        paper: "A",
        link: "https://drive.google.com/open?id=1JDQWgCQuxeW6gxaIg3bBaEL5g1wQQQ28",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        paper: "B",
        link: "https://drive.google.com/open?id=1-Gr50TinwbeOul1-8WOfRXIxeHWnG7rQ",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        paper: "A",
        link: "https://drive.google.com/open?id=13a9hAcFW5YhHxOW3TDd_az184r0wuu5A",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        paper: "B",
        link: "https://drive.google.com/open?id=1zwGGXfK8L6LA6lut6th3JK9F6bjQteMz",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        paper: "A",
        link: "https://drive.google.com/open?id=1qWjJKMOesE3cWRy34Iujb5ODEBcaeFGd",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        paper: "B",
        link: "https://drive.google.com/open?id=1jAuzwqTPDTJPYglS5tU-TIeCaWHHRFlT",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        paper: "A",
        link: "https://drive.google.com/open?id=1LAqPkuw6ZVhWRbVMHj7LIg9rjsG1Ub_O",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        paper: "B",
        link: "https://drive.google.com/open?id=1NjUPLxmEBbeK0_ZQ-GpzJpOjFmXmuuPG",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        paper: "A",
        link: "https://drive.google.com/open?id=1GrCHEF7aKEPUZd4s2Z7N_QrYSi7MtzJT",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        paper: "B",
        link: "https://drive.google.com/open?id=11b4wI5JuWFRGw3Y2sLKoNxkuB2wc5YF0",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=10JLAlHZuIY1UdBhzb9wV_zBapiGhtJE-",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=1xs8GZDn5ZCP5OC763tb9t9PFUchpnu8W",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1fgHphrTlRT6V_JnLciBc-ys8kek_EbpC",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1vA2JYwr-H7MWpi8jj4ElMWTHRGmKkrgU",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1_5CyZ8WxZuQHxJoxsFwYX756TugDpxz7",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1Eh15W1lIaEE9tWcOmD3UrMescrTjTFtL",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=1XY-xO3cJsepVju1fCpnZBmth17Ds0x0F",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1-oC8fbHzmR-pLXTQVEQcZqSIH-R71k-T",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1nB9XOx63GAD6lkKuSF5IHudJwvFUGGrx",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=1FJaQZvzotiN12fFwCF1l3lrzLzq0e3YR",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=17IS7_uY3liOUjBzBHM4e4cA1r01Ncsa1",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLEnglishPapers.ts":
/*!*******************************************!*\
  !*** ./src/app/Papers/HLEnglishPapers.ts ***!
  \*******************************************/
/*! exports provided: HLEnglishPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLEnglishPapers", function() { return HLEnglishPapers; });
const HLEnglishPapers = [
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2019",
        link: "https://drive.google.com/open?id=1Bg2ya2Mky9wuZwMhTopwS5N0H4pNo3JY",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2019",
        link: "https://drive.google.com/open?id=1DWyS4nMWO721qq8us9iyeV4m5bZAcs8V",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2018",
        link: "https://drive.google.com/open?id=1fcLMJSEbq5WiynDPhqlwcfwyYpAwWFKb",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2018",
        link: "https://drive.google.com/open?id=1HDmG49fmUKx7ummK0MQweATzVLOYfxQo",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2017",
        link: "https://drive.google.com/open?id=1U-rpGcBV--dCS4MplF5_3dwT6lrs9ccW",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2017",
        link: "https://drive.google.com/open?id=1RJhDW_gG_sSDWFMEkyFEgrYWwsrcRVMk",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2016",
        link: "https://drive.google.com/open?id=1rR7Woga_GnytwIC4jR39iIstzj_TOLFo",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2016",
        link: "https://drive.google.com/open?id=1Qpys_gOT0oHGAB1wZ4A1k5CXBwPFcetw",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2015",
        link: "https://drive.google.com/open?id=1i-WXqHMo33dmdJgypcc-DwnLc1gnC7sb",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2015",
        link: "https://drive.google.com/open?id=1r7VdlGUNzp016m4po4erIrp52_0sKfeg",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2014",
        link: "https://drive.google.com/open?id=1oYxGzjycXVxkb9pzgpHZITcuKTbSgOCn",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2014",
        link: "https://drive.google.com/open?id=1-zql2FVxxvBG3LTqK64UMjSLfmXYhzQF",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2013",
        link: "https://drive.google.com/open?id=1P2UF6lvi4WfhhXlyXelI9ZS_ipeuac04",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2013",
        link: "https://drive.google.com/open?id=1bmb-xLlWdF6sUN8Ib2YA6Gkx7QFfhgve",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2012",
        link: "https://drive.google.com/open?id=1JtznQFbIZZ_g5BGU1pHK1yX__OlVqN4J",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2012",
        link: "https://drive.google.com/open?id=14uuBBBIw4Pib-FDyPu46FjX4HKP9C_WA",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2011",
        link: "https://drive.google.com/open?id=1t_Jb412gmY-7x_OK8YD1G5WsYAjvIThp",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2011",
        link: "https://drive.google.com/open?id=1sEyzaUU_peCy8qQcWKttGovRIRO4wMhL",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2010",
        link: "https://drive.google.com/open?id=1hBYBlmFXu2IwEbrGFS9fUpKIBtpaDtO_",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2010",
        link: "https://drive.google.com/open?id=1vpW9LiwTFVw_icpkF55yP9lpXBmc5VHg",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2009",
        link: "https://drive.google.com/open?id=1_qezY6Vc1M-0hfvi4qGVxodeOqfzp5sw",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2009",
        link: "https://drive.google.com/open?id=1GBtvdGS7oFNU2FEgysaLCa4pcD1tG38a",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2008",
        link: "https://drive.google.com/open?id=1y2yh-Tp-4Wm8M-exPk37KhmydgXJ0bah",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2008",
        link: "https://drive.google.com/open?id=18U5lKJ-FgFArsbRFy4B9UvZtfuz177uD",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2007",
        link: "https://drive.google.com/open?id=1kG7FgAeRQgQuvbMcMLgo4t1HWViTHX8D",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2007",
        link: "https://drive.google.com/open?id=1U32hter8a-hTfjvMzPOFIq3bQVeAk3uJ",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2006",
        link: "https://drive.google.com/open?id=1IQ8Eea1Twb0Hns3uQgN2Z2dGfog0Z-w0",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2006",
        link: "https://drive.google.com/open?id=1bdwkn5vi7PirI8u_6eZ8j65gdTBzPUxU",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2005",
        link: "https://drive.google.com/open?id=1cg699ErsXrepKyesOP5gUrpLFO8cbUkA",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2005",
        link: "https://drive.google.com/open?id=1FL_IN17hL2iUokiJuNbt8dTsCW9QBQDx",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2004",
        link: "https://drive.google.com/open?id=1U2ZDn9RKcCkeU4fUlMPAQ9GptH738viw",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2004",
        link: "https://drive.google.com/open?id=1t7gXWVPz9frh2AjRKD--MXX9hhLrEl-j",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2003",
        link: "https://drive.google.com/open?id=1tk3ytx-q8w7iIxEv_o5pSedGkbqavUDJ",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2003",
        link: "https://drive.google.com/open?id=1Ei1cmeNYNdJbCsHlkpDEbBYMtPtRczFv",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2002",
        link: "https://drive.google.com/open?id=1hNd2q6xcUpcqXB8deeYDnx8TWy362THv",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2002",
        link: "https://drive.google.com/open?id=1Rxzt-PUeiRUxdliHYlF1eBS1WHgE97jx",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2001",
        link: "https://drive.google.com/open?id=16jlDfI2xfVGjbvV-jBsWAIOULVs5BjT3",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2001",
        link: "https://drive.google.com/open?id=1h1hlp1RjCX48ZQMyXiq671rNMFunqZVW",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=1MEjXgKIY9ZY-QeqwGkdRPSTtqVAa3Kt8",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=1SVySp9e4KOqZsZtsRj7L55FG4iJLkG-s",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1gsN6sMzFmJdE5GonqPsRhaVg3bpDWP2J",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1VWGe0oBY_eTCDXPrRlXiiXot6gJZnoen",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1yQa6EWXHgIU_7hGN5hpHfI1tCwCp8LdC",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1mWO6XdQKENpzLT7MLOUErvXDfNtrUouH",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=1-OfseaMExU6JtLGaXp7AoH0VjBSDZK4_",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1TdwiJNt83yqwYUXYIPj5EBvJW3hIfkUK",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1CIUuvOWBOXsb2QmU54uLx-x5jmK5bmdM",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=1cen5XcjcLygdtuC1B9tXVc1TrhFEBJd1",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=1Qwu2FL_q7Sgq4rzeqEqjc7o3Hoi-4eRR",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/open?id=1cBQqYLzxCqJBTT45g4A4nkMglw6Nv0Gh",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/open?id=1T-8TXwGbar_aEebcU1JCsOhXRk1sC3e4",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/open?id=17kEQzonQDpUXFs6EP6z__YAweXeDHExS",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/open?id=1UWaoDdz2uew-z4h2_pTBQl0ByLfPoxKF",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        link: "https://drive.google.com/open?id=1pbbqjBFbHOsBaqsc8gOl69cHlVS33iPg",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        link: "https://drive.google.com/open?id=1tRr5f7a-9drb9rMf8RgY7TM61LBcKXjG",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        link: "https://drive.google.com/open?id=1Rz4Ze-kbWPuwgktv3w-aICTOFsq-J0hW",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        link: "https://drive.google.com/open?id=1Ql50bPzqwWjN1raMt-hFv6Y8kQvNsrDO",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLFrenchPapers.ts":
/*!******************************************!*\
  !*** ./src/app/Papers/HLFrenchPapers.ts ***!
  \******************************************/
/*! exports provided: HLFrenchPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLFrenchPapers", function() { return HLFrenchPapers; });
const HLFrenchPapers = [
    {
        tipe: "ExamPaper",
        year: "2019",
        link: "https://drive.google.com/file/d/1SdhYnd56S7_1z2DeURa0HkNI0Fbi3wpg/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        link: "https://drive.google.com/file/d/1edjNlZd0GuE8fNiS8Z1J9OtVs2-O1jH5/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        link: "https://drive.google.com/file/d/197NVpLL6Aqmu-360-v_ZvDuH1HI1RWMa/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        link: "https://drive.google.com/file/d/1ehpOoVMS9C1hD2uWmghLsiHdsSRYXChf/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        link: "https://drive.google.com/file/d/1K7iBRd1ir76aCYdWpfdM5rcYc-LHN22n/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        link: "https://drive.google.com/file/d/1kJ22I44P-_4wKdeGa62tO-8FQ-qnUBH2/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        link: "https://drive.google.com/file/d/1vsMFADgeRV1zPI6zPBwVTK0P1nQHEdFQ/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        link: "https://drive.google.com/file/d/1zkrMI-2nc3YKSsdX6We1j-QENiw3VJb7/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        link: "https://drive.google.com/file/d/1AOJgiE8Ue-mlWcDXuP09BiTy3ru6gStO/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        link: "https://drive.google.com/file/d/1SgUEetRjvTeUhmjrrtnel6fOlAz951Zr/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        link: "https://drive.google.com/file/d/1HqqcvL8AR4PgSr0-NTR7fMkaMg2_1J6Y/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        link: "https://drive.google.com/file/d/1VDwWldvcrQk5vQJcnbnLYhGBqQTRdLvq/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        link: "https://drive.google.com/file/d/1lUIvgj1yfTAcdJdtiHSAg8GfXtnfvWct/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        link: "https://drive.google.com/file/d/1rId7VjwUgPmZqbRGxHWSwoMJkOaH5kSz/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        link: "https://drive.google.com/file/d/18XIF3eva5JRVmxceTqQjSCS3hZYkxD7F/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/file/d/1vjeMnOyuR6eh3NPqWaq3sUs9v5Na0Cj6/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/file/d/1LxaNKyTMUDErsxOeJLpntwOLj9OXIIBf/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/file/d/1RQ6siVEBebFAOL4oo0MofeZLNwnzKTOH/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/file/d/1MJPR9Nn666Wq974QLpTKHPHVrAlif_6M/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/file/d/1e0tcATgOFvSBT86v6NYu50e6Mu55H6-t/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/file/d/1bxKy4OZ_1cHZG16DCaZc7n7yQPw3iHEW/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/file/d/1GFr1mXBgy7bfXa93neDhVk-atUalkE7C/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/file/d/1AEBe8aMqul2YnF-mCvur-179W1MEo7CK/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/file/d/1RblXsSU0KsVs2odQSTRN7QMQH9-zZMu-/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/file/d/1W23UHIuAUSPBibdFS5zJJ2oiIusk2PPK/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/file/d/16ajRxVc9yAiYAFUSLlGZBeeI6nv5Z-XV/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/file/d/1hXRrTAode8FatUqYL_4dYwx2VHxzHvvC/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/file/d/1TO1L9S6O9DkplC2eBT9-B51MoaZaMVpr/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/file/d/1BRkbZzIzBiqKNYhzfASshWBBMFpkJYjO/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/file/d/1mAVNwT4l-rmW-LfGOdRm7AIFBN5y5kZX/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2019",
        link: "https://drive.google.com/file/d/1NXKkdgsahUFu9mHdfwz6uj7945yhBe2A/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2018",
        link: "https://drive.google.com/file/d/1dC50nliFF2NJlS_D5kTMhJMwrYxWiVCA/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2017",
        link: "https://drive.google.com/file/d/1ZobE8LeykdFh9A4jnaXevYfFb-YSeeWr/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2016",
        link: "https://drive.google.com/file/d/1JD0lpVvQ9zdZY4pQ-lzFuFME24jlYq0p/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2015",
        link: "https://drive.google.com/file/d/1SPOEACmDS7XTLDjXJLdSItbXa6iCHv2W/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2014",
        link: "https://drive.google.com/file/d/1GYRmJgvgW4HtAOJRfSViXD7lPxCDwpGm/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2013",
        link: "https://drive.google.com/file/d/1172o4sZ7rFvjomLEvHLj39LG6kg3eJyY/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2012",
        link: "https://drive.google.com/file/d/13WcIs6ihSzcp4VhUwYzh5q-S4UgZgfXP/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2011",
        link: "https://drive.google.com/file/d/1O1H0dL3EXnjpo6Pf6AnKDJLLYNSRpCr-/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2010",
        link: "https://drive.google.com/file/d/1mjUsoWz9J1y5N9m6hr0_9FU8e2nl18JC/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2009",
        link: "https://drive.google.com/file/d/1swit_Cuasfw0aUIn--1S_rVLuP6EfGR2/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2008",
        link: "https://drive.google.com/file/d/156fGoLUg0wrxpUIuiI-mq3WUfNxxANiX/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2007",
        link: "https://drive.google.com/file/d/1smQD9cj0UZsNo6gg6Y2OoO7G6sG4Xtlc/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2006",
        link: "https://drive.google.com/file/d/1yxLfkU6z9U3pMpFtM5QFNtQ4UvQYF6Mu/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2005",
        link: "https://drive.google.com/file/d/13W-rdnOjEIx3coZWZhKoS2ZuuRXwBXz2/view?usp=drivesdk",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLIrishPapers.ts":
/*!*****************************************!*\
  !*** ./src/app/Papers/HLIrishPapers.ts ***!
  \*****************************************/
/*! exports provided: HLIrishPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLIrishPapers", function() { return HLIrishPapers; });
const HLIrishPapers = [
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2019",
        link: "https://drive.google.com/open?id=1_DmSN52N1ilR0r_jxgWfWH3SF6OycIs4",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2019",
        link: "https://drive.google.com/open?id=1kiC8s9d9ktqCvZ6sU3hd-iMRGY6xMxCO",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2018",
        link: "https://drive.google.com/open?id=1F9NXEE4IqGimXAIjRxw3samjCrI1bpdo",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2018",
        link: "https://drive.google.com/open?id=1Ywp-M6-Cbxc3XUcTWtoHkD3nERDyX1B6",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2017",
        link: "https://drive.google.com/open?id=1KjvONO332ZYjfCrpDkL7tcVgybLXWe72",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2017",
        link: "https://drive.google.com/open?id=1DLcY_KE3WV-X9e34OH5A6yw9iktusvWS",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2016",
        link: "https://drive.google.com/open?id=198rISurdz4msprP994WPEjGf0LRIIcFS",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2016",
        link: "https://drive.google.com/open?id=1KSwTQCxfKBT4X0SO5lqJF4R1RH0Q9pa-",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2015",
        link: "https://drive.google.com/open?id=1Li1e85DS2k3xtR7kQZiBsfwcLoN7k3IU",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2015",
        link: "https://drive.google.com/open?id=1EH_hBlSJPxtn6HGhWXibTaNFa11_rSWE",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2014",
        link: "https://drive.google.com/open?id=1DPo4tRJ3qf5ttBEBH7SUVFX22VfLirGC",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2014",
        link: "https://drive.google.com/open?id=1VsU7aKKT1Nh98E78yrcH-Hhu3D1jK7uE",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2013",
        link: "https://drive.google.com/open?id=1HqB4hTAs1MAhYfyJvsH_3C09KdszUhYZ",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2013",
        link: "https://drive.google.com/open?id=1TOxOsQt1Y_VTIr78fVgT_tq1ovH1LQkg",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2012",
        link: "https://drive.google.com/open?id=1H8Zbb5HPgd4FmQ4NDEKbigondZ5m2oUJ",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2012",
        link: "https://drive.google.com/open?id=1Oy2opsbPrZUlI7xDp3Nst79aGWhGDOsP",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2011",
        link: "https://drive.google.com/open?id=1DzgTI3stzAoeB7S-J4t4KTBRlsFTtvmv",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2011",
        link: "https://drive.google.com/open?id=1gy9IZzLurcdu2gMZYhlqcOqJNXR0f0HG",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2010",
        link: "https://drive.google.com/open?id=1qrqB3VOrZ9UKaWnl1qpMl4QxsqkqjIT4",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2010",
        link: "https://drive.google.com/open?id=1QJKWQrJV-AOwwfH025KIKOurr96bJ0XT",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2009",
        link: "https://drive.google.com/open?id=10vMUMv99HiLvXVH_tedVuPIcPXg9qNKM",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2009",
        link: "https://drive.google.com/open?id=1FleO4arO4Yn86oAE45US6Jh6k1agU5Un",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2008",
        link: "https://drive.google.com/open?id=1VjugwBpDIFVVJAqVmh2rpINmuj8CjES2",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2008",
        link: "https://drive.google.com/open?id=1dRHhCaOa0arkN9ElPE4QFI9k0B2dEx8u",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2007",
        link: "https://drive.google.com/open?id=1UlsCV9fMb4VG_KJKW50Q69GBc8Lq0t68",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2007",
        link: "https://drive.google.com/open?id=1YuBG5KroWT3fPhkvj0XPd3MI9DgWnf0d",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2006",
        link: "https://drive.google.com/open?id=1t02vsbeNskVkIjo75tOOPxZ8VIuxCcrA",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2006",
        link: "https://drive.google.com/open?id=1nLaWnisfdssFtLPZqpyrcsdziYoCuYYi",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2005",
        link: "https://drive.google.com/open?id=1BnyYpB1FR3y2jjhOAy-hc9IDYqINLfnw",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2005",
        link: "https://drive.google.com/open?id=1U61E90vVhGKD-EzOJxWAXpEIBx3Q2ZAc",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2004",
        link: "https://drive.google.com/open?id=11Nz2XPaHxsK72AdcBa3if3LXB1Ft2lBI",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2004",
        link: "https://drive.google.com/open?id=1oiqecZovAIpbiEyVnWPImBxftIpdz5Ma",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2003",
        link: "https://drive.google.com/open?id=1eT_Vq5AIOlX0Ixio1q-3BXNadNps0Nre",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2003",
        link: "https://drive.google.com/open?id=1r4aODpz3kb9NbFcWzPwALcr6cd24rIB9",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2002",
        link: "https://drive.google.com/open?id=1M2pSvcKzA7OMFD9b47AZ6I24O44y-Hr2",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2002",
        link: "https://drive.google.com/open?id=1qL1jIbPNe5QmebBYQEu_sBRFW-gmefzc",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2001",
        link: "https://drive.google.com/open?id=1kDxyXVQcwhNw1WOw4cNF6EQ86_FNF_M1",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2001",
        link: "https://drive.google.com/open?id=1D97BibNm3tNTVzUDHFvUhajlZLqBGZ3T",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2000",
        link: "https://drive.google.com/open?id=10ICeC_yOJWala1d66PkWVUOEcpl3OTID",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=19Hz9nzCHbfKMP_O-pplqUwceQUKUIwzx",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=1Fr_wXVopr5UMKmom4CrTQ2CKjGGw-gqa",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1m2ewJ4_BIcLO47M9riSXkU6RoXXofc5b",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1QNeljSdkQ280WTqHwDHJb5KPo6xNH-Gx",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1Z9kI9a1SbJyVfBibAYJiSGfutHOu9uiH",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1wVCbbSKhehn8LuNzJdmMv_G188Df5Ctc",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=1iABnTnlXeyrrG-e6xyTs1q28Q85R0XY5",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1wINd2Bt8h_ZRmWUhAinm7iyKq6M3grAH",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1yWSCGSe4C7Aj_J_C57_CTJ2apmbJKHE4",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=16L6XQHsycP_vHEKbrfsb0PkOpEjFtaiQ",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=15GUaFpGz1DhQK5bMF5C4DNoqeebDqO8I",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/open?id=1_zXa_l2Z_b-L9INzLxOUNCiCU_kksJFc",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/open?id=1zsagDl3rQB4xkyayiPFIQPOq6GZsQUXA",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/open?id=1TQI0Mx2UNOeA_Dm4FkymDODp5vBjfmnR",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/open?id=1GZPRTqTaZdl8SD9yxZX3wwR0EGuAEzsq",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        link: "https://drive.google.com/open?id=1HANNxQu2SVa2TeYZw7gGjQS1w8GJNgYx",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        link: "https://drive.google.com/open?id=1m2INf0TxkPaxfr7_LN8aarAYqcQOb_Vk",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        link: "https://drive.google.com/open?id=1rHER6GVB4piv85U_XjOguzyO4YVAiCbI",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        link: "https://drive.google.com/open?id=14sOq5kZ5oPffpVY44Nv9T-iFSIip0V3S",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLMathsPapers.ts":
/*!*****************************************!*\
  !*** ./src/app/Papers/HLMathsPapers.ts ***!
  \*****************************************/
/*! exports provided: HLMathsPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLMathsPapers", function() { return HLMathsPapers; });
const HLMathsPapers = [
    {
        tipe: "ExamPaper",
        year: "2019",
        paper: "One",
        link: "https://drive.google.com/open?id=1OKE3hwhuJCAZsHUL8M0sw00YHyM9Fz39",
    },
    {
        tipe: "ExamPaper",
        year: "2019",
        paper: "Two",
        link: "https://drive.google.com/open?id=11tPHhko7Zju4U30SQSIApgjWNn8Mix6J",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        paper: "One",
        link: "https://drive.google.com/open?id=1qJQwEBLZdhHfAR0gncERUMuxs-ZQV9F1",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        paper: "Two",
        link: "https://drive.google.com/open?id=1GXnSnpwFUSXy_BOi3xjcdVuhH6xAaHRi",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        paper: "One",
        link: "https://drive.google.com/open?id=1KcClmGcQouyvIXKyIGow12h-LOK4aZik",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        paper: "Two",
        link: "https://drive.google.com/open?id=1ilwLBgKbHUljVsajTLSVebpb0z6Qyg6z",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        paper: "One",
        link: "https://drive.google.com/open?id=1eljAD5CpIZlLTgiB9BRFc2-WbBrj_Vow",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        paper: "Two",
        link: "https://drive.google.com/open?id=1pWtUhMvKS8_rf086QzGm5ocvfjn54SLG",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        paper: "One",
        link: "https://drive.google.com/open?id=1AS8DnAszP3Kp2FI4-Rxe5f5XQHFKjFMn",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        paper: "Two",
        link: "https://drive.google.com/open?id=1WVcsRYhrn3fkUNBL8bWERgdEcVaioBHq",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        paper: "One",
        link: "https://drive.google.com/open?id=1ryiYG4Dn_Eg4xFwb9Adi8_gDXFIeccpY",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        paper: "Two",
        link: "https://drive.google.com/open?id=1R08nZ4e86h6K2AnlksYzJvCdqkvPv7o_",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        paper: "One",
        link: "https://drive.google.com/open?id=1ggdENITr5VjwtwTB1SM6Ee_V0WWXajAG",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        paper: "Two",
        link: "https://drive.google.com/open?id=1hJiCSkhOdaq9SlKovlN0lHTo_wJ7tjHT",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        paper: "One",
        link: "https://drive.google.com/open?id=1yLHZzdY2fvAmMqTgxn90QEgU559xThX-",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        paper: "Two",
        link: "https://drive.google.com/open?id=1u4vrRgO8iGuR7rTZDC-kuwAeEIYmedqB",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        paper: "One",
        link: "https://drive.google.com/open?id=1EcI3cJkjsqZXxCBDjOhoabfu_YDwv6_7",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        paper: "Two",
        link: "https://drive.google.com/open?id=1f_GnH-KrFLTmygjwecf5jYxlVzN4mViN",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        paper: "One",
        link: "https://drive.google.com/open?id=1vNvDq1kRJMFuxica59FTxlOM5vRSMtQc",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        paper: "Two",
        link: "https://drive.google.com/open?id=10lqz-Ch40B4HUcsGIy9bXjtlsy7jUg0A",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        paper: "One",
        link: "https://drive.google.com/open?id=13RwygqounJiRp9KlqYIN8hYY2b8Mmj_a",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        paper: "Two",
        link: "https://drive.google.com/open?id=17hWCR0oz1LbkxCASdOIduj29_5pxNhEY",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        paper: "One",
        link: "https://drive.google.com/open?id=1gADmICMI9voe3Yxdhix3n-X-m9Xeb0Je",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        paper: "Two",
        link: "https://drive.google.com/open?id=1i-frtVcqBB0nf176JqsL03zL0NzfrMQs",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        paper: "One",
        link: "https://drive.google.com/open?id=1EGZSM2f5YjUgvaEbnqz0zj0k_dwMqb9j",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        paper: "Two",
        link: "https://drive.google.com/open?id=1c4pIr34s89oaBVxWrcV0sHrTbLe3qMvY",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        paper: "One",
        link: "https://drive.google.com/open?id=1Vv7--ek-nYPJSPLXEVsRapwzKGGoy5-r",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        paper: "Two",
        link: "https://drive.google.com/open?id=10avQcRp3lPflYYn1TNpUfiC4IVlJGXv9",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        paper: "One",
        link: "https://drive.google.com/open?id=1ZGAjNLCd1HcgKbPfrN_jm38LVqGm45Ai",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        paper: "Two",
        link: "https://drive.google.com/open?id=17LtXXHr-1onraeUrnw_P2UdB8pgQVhi2",
    },
    {
        tipe: "ExamPaper",
        year: "2004",
        paper: "One",
        link: "https://drive.google.com/open?id=1rp-QVJmkDTqoOGtLtaXTVmK5ZSpOvz2h",
    },
    {
        tipe: "ExamPaper",
        year: "2004",
        paper: "Two",
        link: "https://drive.google.com/open?id=1P9e4Jj7K8M0DZACIEQLKDTMXjoy-q_Zl",
    },
    {
        tipe: "ExamPaper",
        year: "2003",
        paper: "One",
        link: "https://drive.google.com/open?id=1k1jDqvt2-fgpu1wEEHlQXQ6TOV50NiCn",
    },
    {
        tipe: "ExamPaper",
        year: "2003",
        paper: "Two",
        link: "https://drive.google.com/open?id=1I8lu9F16ZKwrP0u0DANcZWuQ4Byr5yUo",
    },
    {
        tipe: "ExamPaper",
        year: "2002",
        paper: "One",
        link: "https://drive.google.com/open?id=1mVSZGBpcA1GxPi2479lNz-1lRu7eltSV",
    },
    {
        tipe: "ExamPaper",
        year: "2002",
        paper: "Two",
        link: "https://drive.google.com/open?id=1uV0BqsOH6K9YsSV286eNBI902jQ0rXGD",
    },
    {
        tipe: "ExamPaper",
        year: "2001",
        paper: "One",
        link: "https://drive.google.com/open?id=1grdZNqtziqUy0rXKcweP7valH21L5S4X",
    },
    {
        tipe: "ExamPaper",
        year: "2001",
        paper: "Two",
        link: "https://drive.google.com/open?id=1lrg-pBWucReOew73QGzTpI5tiGMni-LU",
    },
    {
        tipe: "ExamPaper",
        year: "2000",
        paper: "One",
        link: "https://drive.google.com/open?id=1jssR1kXDWCgPPUyotRG73Zxoo86bBc8y",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        paper: "",
        link: "https://drive.google.com/open?id=1p_ARszktKYOhC4Q2IaLn-q4l7GjhK94k",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        paper: "",
        link: "https://drive.google.com/open?id=1YVaNtFcwvNzrMtJ6e8i1abcHIHr8_uP8",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        paper: "",
        link: "https://drive.google.com/open?id=1vnzKZf89e1uIwGMVeoipQ3PRavnhylWV",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        paper: "",
        link: "https://drive.google.com/open?id=1nqv0sv8oUDlFJ9kCv78nHNKftq3LgPC1",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        paper: "",
        link: "https://drive.google.com/open?id=1C8w80o1gIc2c1Wa6OkErd_K6xA8J6k9e",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        paper: "",
        link: "https://drive.google.com/open?id=1lYZjktbOPiMWtTCxMqxJVLrT6UAkIvH0",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        paper: "",
        link: "https://drive.google.com/open?id=1PPrtQYSXDL8PXbs7cZqEPudDlwstLu7T",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        paper: "",
        link: "https://drive.google.com/open?id=15QOr4GhZMDdNy783ZKvrZzY-Qirc678p",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        paper: "",
        link: "https://drive.google.com/open?id=1lqkSNcgCH3LW7_OIcAX5CNLpP8VR6jop",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        paper: "",
        link: "https://drive.google.com/open?id=1bHve1w4EtG5r3-NSqkXqHTyXTE4dmiRT",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        paper: "",
        link: "https://drive.google.com/open?id=1LZf6vaPwA7gENC9jFmVkW0Wa2LcIFcX1",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        paper: "",
        link: "https://drive.google.com/open?id=1AJzWDteZ_6_InIxh8OvbRPYgw478mWy0",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        paper: "",
        link: "https://drive.google.com/open?id=1cwhO_gFzHRhD_F6FAO8dQyoRBSYi2IOu",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        paper: "",
        link: "https://drive.google.com/open?id=1n3Vv93xtyfFbO02aLRX2gpFICgvTU_cR",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        paper: "",
        link: "https://drive.google.com/open?id=1GOlZmIBJHhqUfSM5H47-MmRdRSyldpHe",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        paper: "",
        link: "https://drive.google.com/open?id=1MKImss2BE3mgArW0dOoKBaSNBQswiujs",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        paper: "",
        link: "https://drive.google.com/open?id=1x3KkT9StyamE-k4vFr2RIV37iP1mQJbp",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        paper: "",
        link: "https://drive.google.com/open?id=1KIg4EL2iSBL6qmGfYggZUzR7Gf1SnceW",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        paper: "",
        link: "https://drive.google.com/open?id=1UlNcocsJNVJ0Exy_5HlhcDTJXOdPARWj",
    },
];


/***/ }),

/***/ "./src/app/Papers/HLPhysicsPapers.ts":
/*!*******************************************!*\
  !*** ./src/app/Papers/HLPhysicsPapers.ts ***!
  \*******************************************/
/*! exports provided: HLPhysicsPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLPhysicsPapers", function() { return HLPhysicsPapers; });
const HLPhysicsPapers = [
    {
        tipe: "ExamPaper",
        year: "2019",
        link: "https://drive.google.com/open?id=1fARaqZqUCLWKccMqDp2gKeJPYyI1QCx7",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        link: "https://drive.google.com/open?id=1HUAw3H0i_2mv-VVXOL7g6Zx6Dv5iIbl2",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        link: "https://drive.google.com/open?id=1A8k34TMFm5dR2D4h795_uibXR0e2kb7t",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        link: "https://drive.google.com/open?id=1aZXqc42myao92r2gy4495uWsY3wRBXYG",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        link: "https://drive.google.com/open?id=1GBKgfVpPqvJxwgujbbTtYZXCzRyT0Vva",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        link: "https://drive.google.com/open?id=1ngrDppnwkcri-moM_5X_kUfS8Dnz4MxM",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        link: "https://drive.google.com/open?id=1gZ2FJxrsYm3up8acr8Npg-u02_6n9FWO",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        link: "https://drive.google.com/open?id=1qGf2SD7JBMTBvvt6FW4pJTJz7IveG2Jc",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        link: "https://drive.google.com/open?id=1-jl-1Rfd44EIUk1Tgj3VYd6WtD1cmlko",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        link: "https://drive.google.com/open?id=1aoSjG3yVhVTwrjTi2Qki7DLddICQEixm",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        link: "https://drive.google.com/open?id=17bSAd3jdG7wKGiDtEKPcOmP7vUj3IEE_",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        link: "https://drive.google.com/open?id=1vzxeN981Dc_m7jL-SQWSzaRVq0o637Hk",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        link: "https://drive.google.com/open?id=17IiY592g_T2w4KlnCQvfuTzejTpzRBd6",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        link: "https://drive.google.com/open?id=1FeiW9zQJ96WTKXkJZRzBtaoACkJt8mTw",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        link: "https://drive.google.com/open?id=1GW0YCqVzyx3OhHN1OI0I5F1LqI1vPm4D",
    },
    {
        tipe: "ExamPaper",
        year: "2004",
        link: "https://drive.google.com/open?id=1VGTEtTvSDubyyqEF34hyR0p7xhuf96Ag",
    },
    {
        tipe: "ExamPaper",
        year: "2003",
        link: "https://drive.google.com/open?id=122k5pyZ0fFS5gJbKsOlcpfdzhXEr5I28",
    },
    {
        tipe: "ExamPaper",
        year: "2002",
        link: "https://drive.google.com/open?id=1PgtAcBcD5sQkbu79h4wpFGeXsoUNUHGb",
    },
    {
        tipe: "ExamPaper",
        year: "2001",
        link: "https://drive.google.com/open?id=14T8N9HRlE7TYHqrj2Lbrof0fMFX14Mxo",
    },
    {
        tipe: "ExamPaper",
        year: "2000",
        link: "https://drive.google.com/open?id=1ytFVjfELP2hed8EuhPhf8UpbFDhXETst",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=1V5LRovKqRCJeZ7aBRJGfM5pwR6laMRiz",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=1ZjeJNnCUHKS7YwtWX7MP3fcpx40zcd8y",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1D_rhAenUrGnXD9YtG1DmretUzJ8w8X23",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1CAYkB0SzCepfLBXnvl0Wh7C1LQ9hEvBi",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1BQFl8Fl69piZd-o0iyUgRw6c-KJ4O8xc",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1tnhsWT9s4cF-s6fOMucA1-n7H2RMPUYy",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=1NSf2vQEsoMVtW_W72uUUecs0HRB5kj2x",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1uwYFK6gQ-hKYzTB9t13sSxVY3vouVcB2",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1YpkCSQPBqCb2fQTuX9SZeYVidd8Qm_eI",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=1wlYQkmROUEwixSu4pt14l04WTCdwWR0Y",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=1Q7j6lud4pyhGWPUV5ZjrS9d8sAzy03xI",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/open?id=1BSUJlGTzHWjUvw4DRg5OkT5APLYOyD1o",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/open?id=14YJPkp14KWnf0OJSN4d1AlqobnDW2PUW",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/open?id=19KzqOdkiFLIfkVVceeCGBvxcX1-5xMZF",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/open?id=1hnOAQo3B0oIdibWT5_D0bS1KSwX7DtjI",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        link: "https://drive.google.com/open?id=1fMwl8FJybUw2Y4Kq71X540ZDVWvR-Xwe",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        link: "https://drive.google.com/open?id=1dbz2nQ1ZSycOox8okw9OgcTlQck5v4d2",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        link: "https://drive.google.com/open?id=1--Z5En_9IFKjMThGlVOqsh-rzQlhIhWh",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        link: "https://drive.google.com/open?id=124QQgHncyNEmHKuSRdcTF8lSeI1wz6tK",
    },
];


/***/ }),

/***/ "./src/app/Papers/OLEnglishPapers.ts":
/*!*******************************************!*\
  !*** ./src/app/Papers/OLEnglishPapers.ts ***!
  \*******************************************/
/*! exports provided: OLEnglishPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLEnglishPapers", function() { return OLEnglishPapers; });
const OLEnglishPapers = [
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2019",
        link: "https://drive.google.com/open?id=1kPRhOhqOA50UhnBCypqFMvy0Fd2tXn14",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2019",
        link: "https://drive.google.com/open?id=1L1ZPb_2FwunT6o4aLE4exzA6wp2V3KeC",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2018",
        link: "https://drive.google.com/open?id=1dX_nHDVcbepolXOR3C9TxYMjGy-TD79N",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2018",
        link: "https://drive.google.com/open?id=1MLiuZIfOSM_8guAEbbIZfIY9597YhqjF",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2017",
        link: "https://drive.google.com/open?id=1cr4n1PnyS0GUrxNV_gnvjR3Nomd9_-zR",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2017",
        link: "https://drive.google.com/open?id=1_6R1aQZRuMcusrpdSy_9ADQ1NefK1o07",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2016",
        link: "https://drive.google.com/open?id=1YI7EVWpKN7lOBBQz9qnuGXT-xIJA1bAd",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2016",
        link: "https://drive.google.com/open?id=13g58j-7Ku3Tuu05rZkYOrEr6Iiub3so9",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2015",
        link: "https://drive.google.com/open?id=1vNHVlVQ7PtYgu2oNQPSYi706-nSU9v-a",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2015",
        link: "https://drive.google.com/open?id=1bzkKbE7h78qxWLnVK0kCvR0xW78_spHv",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2014",
        link: "https://drive.google.com/open?id=1mQCw-UQ-1eaNDf6RGtWPzPi-J_DwOofl",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2014",
        link: "https://drive.google.com/open?id=16GyYT07eSDA8tgfZDn0iwDDDzcwjXIV3",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2013",
        link: "https://drive.google.com/open?id=1VJqnoMUPA626FYuefnmzgf23F4EuMEqq",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2013",
        link: "https://drive.google.com/open?id=1S9naQW1eE0_YG9VrF-MxGmYzKir8mTyT",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2012",
        link: "https://drive.google.com/open?id=1NfIB2csT84hVSJPJFPOTY1mA6-GBeMlW",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2012",
        link: "https://drive.google.com/open?id=1drcoT8-87oOD_MkkF7syVZJbNfZgSLuQ",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2011",
        link: "https://drive.google.com/open?id=1eMli3ewg_YOsQ4N6tHvx_w6c9n9J1CxE",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2011",
        link: "https://drive.google.com/open?id=1YEku-g3oxzOrIqRnID0hdU0L-QOxxj5g",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2010",
        link: "https://drive.google.com/open?id=1DJJDISGu9OPLYei1EPaYw8juStnh8sVX",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2010",
        link: "https://drive.google.com/open?id=1Ap0tJmT20353Cfy6Ae9tIX-9t7FRpvei",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2009",
        link: "https://drive.google.com/open?id=1f0M4iVVDwcq-6jEAOvk94FQcIvum1j18",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2009",
        link: "https://drive.google.com/open?id=1hhmBPcuUuWY73q31pav4jYKm2D6snkRL",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2008",
        link: "https://drive.google.com/open?id=11fMUnhX8ubuTN8BhUoKkkqSFhIFOpJ5v",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2008",
        link: "https://drive.google.com/open?id=1BmcYMqkQYsP7e6khPmCweVwVyRyVfIuP",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2007",
        link: "https://drive.google.com/open?id=1WsGnSpd6SpMoP8mrnfEVhuLx8Ajq326K",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2007",
        link: "https://drive.google.com/open?id=1BI_ZPXx5BI7Q1vJTRkyH_G6Z71vgp5ec",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2006",
        link: "https://drive.google.com/open?id=1Jlixc4_xOyo-I63R4_USS9XUDrtAn9UD",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2006",
        link: "https://drive.google.com/open?id=1f2KXH4O30Nx7MT8TyElX19p8TfgoRNx3",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2005",
        link: "https://drive.google.com/open?id=1iyiuw-kCb4cvh-DZPOhMF87VYH8X5vqr",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2005",
        link: "https://drive.google.com/open?id=1CQvx9IP8NEDpknaRHNSxcjNPw4mjWWiJ",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2004",
        link: "https://drive.google.com/open?id=1tQe4Lue8XjvWpW2nw-GJMFH1uqDkXyua",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2004",
        link: "https://drive.google.com/open?id=1BqaVoWeLxJZ68HVXiMiXzfcV2ee8eZBC",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2003",
        link: "https://drive.google.com/open?id=1ZofmYwYPCfHWgAn7wyyEkcRjAfc0BZnO",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2003",
        link: "https://drive.google.com/open?id=1P8Mt27irZUw3bbDzc-L5TOBbyxM8zGNm",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2002",
        link: "https://drive.google.com/open?id=1YgwHyRE0UbFYc_9MU7L3HEJFlDN9Kn6b",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2002",
        link: "https://drive.google.com/open?id=1BdQfgketCMEHA6Cz7lnmtqEH9TXqTmrK",
    },
    {
        tipe: "ExamPaper",
        paper: "One",
        year: "2001",
        link: "https://drive.google.com/open?id=1a5X9drea2KA4e34-u4SAXjPBvmeBDX9x",
    },
    {
        tipe: "ExamPaper",
        paper: "Two",
        year: "2001",
        link: "https://drive.google.com/open?id=13A9d6af-v5bnPHewbzIJi_MFLWLkN5pK",
    },
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/open?id=1Dmgrn1e2stpM5K9-tUFCTG6OJy91kqfz",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/open?id=14nx4U8kYT7e3V68B2hoqBdLDYZz6i_tc",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/open?id=1d7I-LLu4PuZl8oZFKA53VrGID7YjgAW9",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/open?id=1Da1_VTwcikxRrHR7QqEtvr-smgnDC17u",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/open?id=1V_ZZz4sKFgEcsvZfl8yw1896K2MJNkfv",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/open?id=1GGfTcaQHRXLw63LBFMR0saIFrrXJO9lx",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/open?id=10ydIv_auBUfKeeFG27CjNbiDoUzJLyCr",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/open?id=1Kr_x9PXeqCj70_G7pDqFKHNp7GXORLi4",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/open?id=1vFvvPxdAN5RakWlc7lO79lrgAYnuXxdp",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/open?id=10Y7pyIHaN-tOudP1fgIp8xohL4_ToIZC",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/open?id=1ugQA4Wni2IvBKrP176BOyqaryHxzzZaY",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/open?id=1U28vh0ZGtNw180-bSt-i6yg8UGVk07Lz",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/open?id=1VwTQrMR3GiRWTGEG3GKrdWZxG_QxZqyM",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/open?id=1u4O3bSM1g3FCuR21JtZcCUf6F4Kj4A4e",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/open?id=1vx5JP5tgZ011cTVsobCnDerzUVGTRQS9",
    },
    {
        tipe: "MarkingScheme",
        year: "2004",
        link: "https://drive.google.com/open?id=19hfBmLhgQFEQRUGhyhqG4LOoLdankAnN",
    },
    {
        tipe: "MarkingScheme",
        year: "2003",
        link: "https://drive.google.com/open?id=19nse7LG1biOzflo83iHLlX35hhL_znha",
    },
    {
        tipe: "MarkingScheme",
        year: "2002",
        link: "https://drive.google.com/open?id=1lciKtMFG5knNFkatGwjjsq8kvA6G3mjn",
    },
    {
        tipe: "MarkingScheme",
        year: "2001",
        link: "https://drive.google.com/open?id=1fgFxB9ozI4jsnZckfUou5ByONHORQm08",
    },
];


/***/ }),

/***/ "./src/app/Papers/OLFrenchPapers.ts":
/*!******************************************!*\
  !*** ./src/app/Papers/OLFrenchPapers.ts ***!
  \******************************************/
/*! exports provided: OLFrenchPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLFrenchPapers", function() { return OLFrenchPapers; });
const OLFrenchPapers = [
    {
        tipe: "MarkingScheme",
        year: "2019",
        link: "https://drive.google.com/file/d/1RrCPwRe-3nnHHlh1T66eFqmAJLRJ08dr/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2018",
        link: "https://drive.google.com/file/d/1N91ZMzXxE8EUc8FoZH_wxmMr1DdqUIfi/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2017",
        link: "https://drive.google.com/file/d/1uU6iqD0VgDm-14gIxSQhU6PauhjnG6N2/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2016",
        link: "https://drive.google.com/file/d/1F3mktn3rlJ5PLLXupRNSrqtnhrRC1Hte/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2015",
        link: "https://drive.google.com/file/d/1vdTL4DP2pwPU-tN2Gvclf34_k3aq18Jy/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2014",
        link: "https://drive.google.com/file/d/1Oe1QYCYZyXJg8kBrZ9RQi6XW2FweZcVf/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2013",
        link: "https://drive.google.com/file/d/1rZBMbIDX5yN-HtAr2eRzQHt6oABD2zBO/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2012",
        link: "https://drive.google.com/file/d/1O6op-L1mig7b6IiIuufbT1hiq8xMrgs9/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2011",
        link: "https://drive.google.com/file/d/1ctSfuJZjb2MJfVhN1yBdMHM9DoHccduw/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2010",
        link: "https://drive.google.com/file/d/1KNx0wocJQgrvvqWRKIGVbPWVycdXovTH/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2009",
        link: "https://drive.google.com/file/d/1NyNSgSu1DWyZMbIM1F8-CQNUoWhO7259/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2008",
        link: "https://drive.google.com/file/d/1eDKa30d4UheWVHDQ8aWfws6MH1SYn2IM/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2007",
        link: "https://drive.google.com/file/d/1Y7FnUYcF2KT2ZTWsxcN2NF5iYnzag6jT/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2006",
        link: "https://drive.google.com/file/d/1-hhYqRqk5FOCr--wNxK4i8CuonWXg0Tj/view?usp=drivesdk",
    },
    {
        tipe: "MarkingScheme",
        year: "2005",
        link: "https://drive.google.com/file/d/1mAt-S0ZYRuXnO3UI9HIkpaflC9GidMXN/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2019",
        link: "https://drive.google.com/file/d/1T8DZK5o_-AlHpA6fws1ke3K1sRwMW1Jc/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2018",
        link: "https://drive.google.com/file/d/1wnnIoo_sOwSPkxX6mgQZkjNK4H9X88fG/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2017",
        link: "https://drive.google.com/file/d/1DvEmIV2xy0NFLEV0b3NykebmNea6qFUy/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2016",
        link: "https://drive.google.com/file/d/14oKomA6KE0hUSaBNmacGmRP9mjCT23s6/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2015",
        link: "https://drive.google.com/file/d/1WLyx5Y8c_8jx9GsB4CbnKlmLvwRzcxBr/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2013",
        link: "https://drive.google.com/file/d/1fMhhQqJnPkInCBlW4gdd6eHZH_u6XAUZ/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2014",
        link: "https://drive.google.com/file/d/1WxfNapYkUNuTwQqSGPgRCxjILHelTXBi/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2012",
        link: "https://drive.google.com/file/d/10g8iJaafVr-oBiTSYrIL04kQbTUFGQVY/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2011",
        link: "https://drive.google.com/file/d/1OL4qAPaeGTWcaexYCvGaFqKVBmzNKAaq/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2010",
        link: "https://drive.google.com/file/d/1KzndArkdP5Ak3ixeUmWpMznolV0A4dtL/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2009",
        link: "https://drive.google.com/file/d/1EZB-7NBUg9GmLmL5Fkt3bXlxLluJ0gA6/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2008",
        link: "https://drive.google.com/file/d/1TzLM0AIVNmzo0Y87ILDpZ85dNLhVijUb/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2007",
        link: "https://drive.google.com/file/d/1ktbwRm0ux4uur-Z5r7_KXEAj3y1WNOOW/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2006",
        link: "https://drive.google.com/file/d/1XSLGx6-mBHJh8lVbS8EkEYy9a8TYoVBj/view?usp=drivesdk",
    },
    {
        tipe: "ExamPaper",
        year: "2005",
        link: "https://drive.google.com/file/d/14dFW12NbUvMozZiEbmh4Sv1EhVjQVNt6/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2019",
        link: "https://drive.google.com/file/d/1SCIp1HNRIWskmaAgpVCWBqBQcbmHYVCf/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2018",
        link: "https://drive.google.com/file/d/1z5i2zXaYP9Zqf5w5tuPAY6NqvRo3e8HV/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2017",
        link: "https://drive.google.com/file/d/16st7_fEglKgCTNQib_zmWcj75bzeGaZ0/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2016",
        link: "https://drive.google.com/file/d/1DgOCv_bTKWDX6VrhrKHUXCipJAsstMnC/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2015",
        link: "https://drive.google.com/file/d/1mBEowM0I5INGvyG_MhEzHssjh7G3R5he/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2014",
        link: "https://drive.google.com/file/d/1lWeVpgY33DYn18cqPYAPG1H_Nys50_Wm/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2013",
        link: "https://drive.google.com/file/d/11U0gg2prsSayYp60j0X6Uqe9Jm_I8VTa/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2012",
        link: "https://drive.google.com/file/d/1Qv4MAGFhZ5YAR50yHCZHFt5Az8IQ4Rh8/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2011",
        link: "https://drive.google.com/file/d/1zHz3L7doG3UVyJ5tB3LZfOWHlV8CZjom/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2010",
        link: "https://drive.google.com/file/d/1Uoucqe63_C5AsC4VXqHD1g2sLYXQEIPR/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2009",
        link: "https://drive.google.com/file/d/1xd_7mkAtu3MsF2BNPEb8361ESxI-nNr3/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2008",
        link: "https://drive.google.com/file/d/19s1Vm_D31wU2-dcYZkzO-wFeTP4oMRUt/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2007",
        link: "https://drive.google.com/file/d/1VaAxwPsEYctpSwooe4n8gWZoxSXn904_/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2006",
        link: "https://drive.google.com/file/d/1l0a_fkg-__s_zH6szUmiSJXi0pK_hU-i/view?usp=drivesdk",
    },
    {
        tipe: "AuralPaper",
        year: "2005",
        link: "https://drive.google.com/file/d/1Fw6HCsSzz-sf_pP9K2_ON5SCeOMka5pG/view?usp=drivesdk",
    },
];


/***/ }),

/***/ "./src/app/Papers/OLIrishPapers.ts":
/*!*****************************************!*\
  !*** ./src/app/Papers/OLIrishPapers.ts ***!
  \*****************************************/
/*! exports provided: OLIrishPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLIrishPapers", function() { return OLIrishPapers; });
const OLIrishPapers = [];


/***/ }),

/***/ "./src/app/Papers/OLMathsPapers.ts":
/*!*****************************************!*\
  !*** ./src/app/Papers/OLMathsPapers.ts ***!
  \*****************************************/
/*! exports provided: OLMathsPapers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLMathsPapers", function() { return OLMathsPapers; });
const OLMathsPapers = [];


/***/ }),

/***/ "./src/app/Papers/SoundFilesFrench.ts":
/*!********************************************!*\
  !*** ./src/app/Papers/SoundFilesFrench.ts ***!
  \********************************************/
/*! exports provided: SoundFilesFrench */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundFilesFrench", function() { return SoundFilesFrench; });
const SoundFilesFrench = [
    {
        tipe: "SoundFile",
        year: "2005",
        link: "https://drive.google.com/file/d/1NL8HdMC6mchCz6YZkzTvwlsxYidxTaN6/view?usp=sharing",
    },
    {
        tipe: "SoundFile",
        year: "2006",
        link: "https://drive.google.com/file/d/18RJmTKcotbzx2biiytrGaJ2JYBZRCnZc/view?usp=sharing",
    },
    {
        tipe: "SoundFile",
        year: "2007",
        link: "https://www.examinations.ie/archive/exampapers/2007/LC010ZLPO17EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2008",
        link: "https://www.examinations.ie/archive/exampapers/2008/LC010ZLPO17EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2009",
        link: "https://www.examinations.ie/archive/exampapers/2009/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2010",
        link: "https://www.examinations.ie/archive/exampapers/2010/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2011",
        link: "https://www.examinations.ie/archive/exampapers/2011/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2012",
        link: "https://www.examinations.ie/archive/exampapers/2012/LC010ZLPO17EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2013",
        link: "https://www.examinations.ie/archive/exampapers/2013/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2014",
        link: "https://www.examinations.ie/archive/exampapers/2014/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2015",
        link: "https://www.examinations.ie/archive/exampapers/2015/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2016",
        link: "https://www.examinations.ie/archive/exampapers/2016/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2017",
        link: "https://www.examinations.ie/archive/exampapers/2017/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2018",
        link: "https://www.examinations.ie/archive/exampapers/2018/LC010ZLP017EV.mp3",
    },
    {
        tipe: "SoundFile",
        year: "2019",
        link: "https://www.examinations.ie/archive/exampapers/2019/LC010ZLP017EV.mp3",
    },
];


/***/ }),

/***/ "./src/app/Papers/SoundFilesIrish.ts":
/*!*******************************************!*\
  !*** ./src/app/Papers/SoundFilesIrish.ts ***!
  \*******************************************/
/*! exports provided: SoundFilesIrish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundFilesIrish", function() { return SoundFilesIrish; });
const SoundFilesIrish = [
    {
        year: "2019",
        link: "https://www.examinations.ie/archive/exampapers/2019/LC001ZLP017IV.mp3",
    },
    {
        year: "2018",
        link: "https://www.examinations.ie/archive/exampapers/2018/LC001ZLP017IV.mp3",
    },
    {
        year: "2017",
        link: "https://www.examinations.ie/archive/exampapers/2017/LC001ZLP017IV.mp3",
    },
    {
        year: "2016",
        link: "https://www.examinations.ie/archive/exampapers/2016/LC001ZLP017IV.mp3",
    },
    {
        year: "2015",
        link: "https://www.examinations.ie/archive/exampapers/2015/LC001ZLP017IV.mp3",
    },
    {
        year: "2014",
        link: "https://www.examinations.ie/archive/exampapers/2014/LC001ZLP017IV.mp3",
    },
    {
        year: "2013",
        link: "https://www.examinations.ie/archive/exampapers/2013/LC001ZLP017IV.mp3",
    },
    {
        year: "2012",
        link: "https://www.examinations.ie/archive/exampapers/2012/LC001ZLPO17IV.mp3",
    },
    {
        year: "2011",
        link: "https://www.examinations.ie/archive/exampapers/2011/LC001ZLP017IV.mp3",
    },
    {
        year: "2010",
        link: "https://www.examinations.ie/archive/exampapers/2010/LC001ZLP017IV.mp3",
    },
    {
        year: "2009",
        link: "https://www.examinations.ie/archive/exampapers/2009/LC001ZLP017IV.mp3",
    },
    {
        year: "2008",
        link: "https://www.examinations.ie/archive/exampapers/2008/LC001ZLPO17IV.mp3",
    },
    {
        year: "2007",
        link: "https://www.examinations.ie/archive/exampapers/2007/LC001ZLP00IV.mp3",
    },
    {
        year: "2006",
        link: "https://drive.google.com/open?id=1yRkjjeqKsXFNdib2gz1PlcZYzWBgifdZ",
    },
];


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 0, consts: [[1, "jumbotron"], [1, "container"], [1, "row"], [1, "col-sm-8", "offset-sm-2"], [1, "footer"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "made by ~ois\u00EDn~");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".TopBar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: rgb(68, 142, 207);\n}\n\n.TopBar[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  float: left;\n}\n\n.TopBar[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\n\n\n\n.footer[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 40px;\n  background-color: rgb(29, 49, 66);\n  color: aliceblue;\n  text-align: right;\n}\n\n.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  position: relative;\n  bottom: 20px; \n  padding: 14px 12px;\n}\n\n\n\n.TopBar[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: #111;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBcUI7RUFDckIsU0FBUztFQUNULFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtBQUN2Qjs7QUFFQSxrRUFBa0U7O0FBQ2xFO0VBQ0UsZUFBZTtFQUNmLE9BQU87RUFDUCxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBLG1EQUFtRDs7QUFDbkQ7RUFDRSxzQkFBc0I7QUFDeEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5Ub3BCYXIgdWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY4LCAxNDIsIDIwNyk7XG59XG5cbi5Ub3BCYXIgbGkge1xuICBmbG9hdDogbGVmdDtcbn1cblxuLlRvcEJhciBsaSBhIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLyogUGxhY2UgdGhlIG5hdmJhciBhdCB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLCBhbmQgbWFrZSBpdCBzdGljayAqL1xuLmZvb3RlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjksIDQ5LCA2Nik7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uZm9vdGVyIHAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogMjBweDsgXG4gIHBhZGRpbmc6IDE0cHggMTJweDtcbn1cblxuLyogQ2hhbmdlIHRoZSBsaW5rIGNvbG9yIHRvICMxMTEgKGJsYWNrKSBvbiBob3ZlciAqL1xuLlRvcEJhciBsaSBhOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMTtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home */ "./src/app/home/index.ts");
/* harmony import */ var _higher_level__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./higher-level */ "./src/app/higher-level/index.ts");
/* harmony import */ var _ordinary_level__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ordinary-level */ "./src/app/ordinary-level/index.ts");
/* harmony import */ var _higher_level_home__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./higher-level/home */ "./src/app/higher-level/home/index.ts");
/* harmony import */ var _higher_level_maths__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./higher-level/maths */ "./src/app/higher-level/maths/index.ts");
/* harmony import */ var _higher_level_applied_maths__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./higher-level/applied-maths */ "./src/app/higher-level/applied-maths/index.ts");
/* harmony import */ var _higher_level_physics__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./higher-level/physics */ "./src/app/higher-level/physics/index.ts");
/* harmony import */ var _higher_level_dcg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./higher-level/dcg */ "./src/app/higher-level/dcg/index.ts");
/* harmony import */ var _higher_level_irish__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./higher-level/irish */ "./src/app/higher-level/irish/index.ts");
/* harmony import */ var _higher_level_english__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./higher-level/english */ "./src/app/higher-level/english/index.ts");
/* harmony import */ var _higher_level_french__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./higher-level/french */ "./src/app/higher-level/french/index.ts");
/* harmony import */ var _ordinary_level_home__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ordinary-level/home */ "./src/app/ordinary-level/home/index.ts");
/* harmony import */ var _ordinary_level_english__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ordinary-level/english */ "./src/app/ordinary-level/english/index.ts");
/* harmony import */ var _ordinary_level_irish__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ordinary-level/irish */ "./src/app/ordinary-level/irish/index.ts");
/* harmony import */ var _ordinary_level_maths__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ordinary-level/maths */ "./src/app/ordinary-level/maths/index.ts");
/* harmony import */ var _ordinary_level_french__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ordinary-level/french */ "./src/app/ordinary-level/french/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_3__["HashLocationStrategy"] }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _app_routing__WEBPACK_IMPORTED_MODULE_4__["appRoutingModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _home__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
        _higher_level__WEBPACK_IMPORTED_MODULE_7__["HigherLevelComponent"],
        _ordinary_level__WEBPACK_IMPORTED_MODULE_8__["OrdinaryLevelComponent"],
        _higher_level_home__WEBPACK_IMPORTED_MODULE_9__["HLHomeComponent"],
        _higher_level_maths__WEBPACK_IMPORTED_MODULE_10__["HLMathsComponent"],
        _higher_level_applied_maths__WEBPACK_IMPORTED_MODULE_11__["HLAppliedMathsComponent"],
        _higher_level_physics__WEBPACK_IMPORTED_MODULE_12__["HLPhysicsComponent"],
        _higher_level_dcg__WEBPACK_IMPORTED_MODULE_13__["HLDcgComponent"],
        _higher_level_irish__WEBPACK_IMPORTED_MODULE_14__["HLIrishComponent"],
        _higher_level_english__WEBPACK_IMPORTED_MODULE_15__["HLEnglishComponent"],
        _higher_level_french__WEBPACK_IMPORTED_MODULE_16__["HLFrenchComponent"],
        _ordinary_level_home__WEBPACK_IMPORTED_MODULE_17__["OLHomeComponent"],
        _ordinary_level_english__WEBPACK_IMPORTED_MODULE_18__["OLEnglishComponent"],
        _ordinary_level_irish__WEBPACK_IMPORTED_MODULE_19__["OLIrishComponent"],
        _ordinary_level_maths__WEBPACK_IMPORTED_MODULE_20__["OLMathsComponent"],
        _ordinary_level_french__WEBPACK_IMPORTED_MODULE_21__["OLFrenchComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_22__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _app_routing__WEBPACK_IMPORTED_MODULE_4__["appRoutingModule"],
                ],
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _home__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                    _higher_level__WEBPACK_IMPORTED_MODULE_7__["HigherLevelComponent"],
                    _ordinary_level__WEBPACK_IMPORTED_MODULE_8__["OrdinaryLevelComponent"],
                    _higher_level_home__WEBPACK_IMPORTED_MODULE_9__["HLHomeComponent"],
                    _higher_level_maths__WEBPACK_IMPORTED_MODULE_10__["HLMathsComponent"],
                    _higher_level_applied_maths__WEBPACK_IMPORTED_MODULE_11__["HLAppliedMathsComponent"],
                    _higher_level_physics__WEBPACK_IMPORTED_MODULE_12__["HLPhysicsComponent"],
                    _higher_level_dcg__WEBPACK_IMPORTED_MODULE_13__["HLDcgComponent"],
                    _higher_level_irish__WEBPACK_IMPORTED_MODULE_14__["HLIrishComponent"],
                    _higher_level_english__WEBPACK_IMPORTED_MODULE_15__["HLEnglishComponent"],
                    _higher_level_french__WEBPACK_IMPORTED_MODULE_16__["HLFrenchComponent"],
                    _ordinary_level_home__WEBPACK_IMPORTED_MODULE_17__["OLHomeComponent"],
                    _ordinary_level_english__WEBPACK_IMPORTED_MODULE_18__["OLEnglishComponent"],
                    _ordinary_level_irish__WEBPACK_IMPORTED_MODULE_19__["OLIrishComponent"],
                    _ordinary_level_maths__WEBPACK_IMPORTED_MODULE_20__["OLMathsComponent"],
                    _ordinary_level_french__WEBPACK_IMPORTED_MODULE_21__["OLFrenchComponent"],
                ],
                providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_3__["HashLocationStrategy"] }],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: appRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutingModule", function() { return appRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home */ "./src/app/home/index.ts");
/* harmony import */ var _higher_level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./higher-level */ "./src/app/higher-level/index.ts");
/* harmony import */ var _ordinary_level__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ordinary-level */ "./src/app/ordinary-level/index.ts");
/* harmony import */ var _higher_level_home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./higher-level/home */ "./src/app/higher-level/home/index.ts");
/* harmony import */ var _higher_level_maths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./higher-level/maths */ "./src/app/higher-level/maths/index.ts");
/* harmony import */ var _higher_level_applied_maths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./higher-level/applied-maths */ "./src/app/higher-level/applied-maths/index.ts");
/* harmony import */ var _higher_level_physics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./higher-level/physics */ "./src/app/higher-level/physics/index.ts");
/* harmony import */ var _higher_level_dcg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./higher-level/dcg */ "./src/app/higher-level/dcg/index.ts");
/* harmony import */ var _higher_level_irish__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./higher-level/irish */ "./src/app/higher-level/irish/index.ts");
/* harmony import */ var _higher_level_english__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./higher-level/english */ "./src/app/higher-level/english/index.ts");
/* harmony import */ var _higher_level_french__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./higher-level/french */ "./src/app/higher-level/french/index.ts");
/* harmony import */ var _ordinary_level_home__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ordinary-level/home */ "./src/app/ordinary-level/home/index.ts");
/* harmony import */ var _ordinary_level_english__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ordinary-level/english */ "./src/app/ordinary-level/english/index.ts");
/* harmony import */ var _ordinary_level_irish__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ordinary-level/irish */ "./src/app/ordinary-level/irish/index.ts");
/* harmony import */ var _ordinary_level_maths__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ordinary-level/maths */ "./src/app/ordinary-level/maths/index.ts");
/* harmony import */ var _ordinary_level_french_french_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ordinary-level/french/french.component */ "./src/app/ordinary-level/french/french.component.ts");

















const routes = [
    {
        path: '',
        component: _home__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"]
    },
    {
        path: 'higher-level',
        component: _higher_level__WEBPACK_IMPORTED_MODULE_2__["HigherLevelComponent"],
        children: [
            {
                path: 'home',
                component: _higher_level_home__WEBPACK_IMPORTED_MODULE_4__["HLHomeComponent"],
            },
            {
                path: 'french',
                component: _higher_level_french__WEBPACK_IMPORTED_MODULE_11__["HLFrenchComponent"],
            },
            {
                path: 'applied-maths',
                component: _higher_level_applied_maths__WEBPACK_IMPORTED_MODULE_6__["HLAppliedMathsComponent"],
            },
            {
                path: 'maths',
                component: _higher_level_maths__WEBPACK_IMPORTED_MODULE_5__["HLMathsComponent"],
            },
            {
                path: 'physics',
                component: _higher_level_physics__WEBPACK_IMPORTED_MODULE_7__["HLPhysicsComponent"],
            },
            {
                path: 'dcg',
                component: _higher_level_dcg__WEBPACK_IMPORTED_MODULE_8__["HLDcgComponent"],
            },
            {
                path: 'irish',
                component: _higher_level_irish__WEBPACK_IMPORTED_MODULE_9__["HLIrishComponent"],
            },
            {
                path: 'english',
                component: _higher_level_english__WEBPACK_IMPORTED_MODULE_10__["HLEnglishComponent"],
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ],
    },
    {
        path: 'ordinary-level',
        component: _ordinary_level__WEBPACK_IMPORTED_MODULE_3__["OrdinaryLevelComponent"],
        children: [
            {
                path: 'home',
                component: _ordinary_level_home__WEBPACK_IMPORTED_MODULE_12__["OLHomeComponent"],
            },
            {
                path: 'french',
                component: _ordinary_level_french_french_component__WEBPACK_IMPORTED_MODULE_16__["OLFrenchComponent"],
            },
            {
                path: 'english',
                component: _ordinary_level_english__WEBPACK_IMPORTED_MODULE_13__["OLEnglishComponent"],
            },
            {
                path: 'irish',
                component: _ordinary_level_irish__WEBPACK_IMPORTED_MODULE_14__["OLIrishComponent"],
            },
            {
                path: 'maths',
                component: _ordinary_level_maths__WEBPACK_IMPORTED_MODULE_15__["OLMathsComponent"],
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ],
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
const appRoutingModule = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "./src/app/higher-level/applied-maths/applied-maths.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/higher-level/applied-maths/applied-maths.component.ts ***!
  \***********************************************************************/
/*! exports provided: HLAppliedMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLAppliedMathsComponent", function() { return HLAppliedMathsComponent; });
/* harmony import */ var _Papers_HLAppliedMathsPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLAppliedMathsPapers */ "./src/app/Papers/HLAppliedMathsPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function HLAppliedMathsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Exam Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.paperLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLAppliedMathsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class HLAppliedMathsComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasPaper = false;
        this.hasMark = false;
        this.paperLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasPaper = false;
        this.hasMark = false;
        for (var paper of _Papers_HLAppliedMathsPapers__WEBPACK_IMPORTED_MODULE_0__["HLAppliedMathsPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    this.hasPaper = true;
                    this.paperLink = paper.link;
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLAppliedMathsComponent.ɵfac = function HLAppliedMathsComponent_Factory(t) { return new (t || HLAppliedMathsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HLAppliedMathsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HLAppliedMathsComponent, selectors: [["app-higher-level-applied-maths"]], decls: 12, vars: 3, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLAppliedMathsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Applied Maths Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function HLAppliedMathsComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, HLAppliedMathsComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, HLAppliedMathsComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasPaper);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9hcHBsaWVkLW1hdGhzL2FwcGxpZWQtbWF0aHMuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HLAppliedMathsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-higher-level-applied-maths',
                templateUrl: 'applied-maths.component.html',
                styleUrls: ['applied-maths.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/applied-maths/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/higher-level/applied-maths/index.ts ***!
  \*****************************************************/
/*! exports provided: HLAppliedMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applied_maths_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applied-maths.component */ "./src/app/higher-level/applied-maths/applied-maths.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLAppliedMathsComponent", function() { return _applied_maths_component__WEBPACK_IMPORTED_MODULE_0__["HLAppliedMathsComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/dcg/dcg.component.ts":
/*!***************************************************!*\
  !*** ./src/app/higher-level/dcg/dcg.component.ts ***!
  \***************************************************/
/*! exports provided: HLDcgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLDcgComponent", function() { return HLDcgComponent; });
/* harmony import */ var _Papers_HLDCGPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLDCGPapers */ "./src/app/Papers/HLDCGPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function HLDcgComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Section A ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.sectionALink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLDcgComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Section B/C ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.sectionBLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLDcgComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class HLDcgComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasSectionA = false;
        this.hasSectionB = false;
        this.hasMark = false;
        this.sectionALink = "";
        this.sectionBLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasSectionA = false;
        this.hasSectionB = false;
        this.hasMark = false;
        for (var paper of _Papers_HLDCGPapers__WEBPACK_IMPORTED_MODULE_0__["HLDCGPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "A") {
                        this.hasSectionA = true;
                        this.sectionALink = paper.link;
                    }
                    if (paper.paper == "B") {
                        this.hasSectionB = true;
                        this.sectionBLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLDcgComponent.ɵfac = function HLDcgComponent_Factory(t) { return new (t || HLDcgComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HLDcgComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HLDcgComponent, selectors: [["app-dcg"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLDcgComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "DCG Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function HLDcgComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, HLDcgComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, HLDcgComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, HLDcgComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasSectionA);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasSectionB);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9kY2cvZGNnLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HLDcgComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-dcg',
                templateUrl: './dcg.component.html',
                styleUrls: ['./dcg.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/dcg/index.ts":
/*!*******************************************!*\
  !*** ./src/app/higher-level/dcg/index.ts ***!
  \*******************************************/
/*! exports provided: HLDcgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dcg_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dcg.component */ "./src/app/higher-level/dcg/dcg.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLDcgComponent", function() { return _dcg_component__WEBPACK_IMPORTED_MODULE_0__["HLDcgComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/english/english.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/higher-level/english/english.component.ts ***!
  \***********************************************************/
/*! exports provided: HLEnglishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLEnglishComponent", function() { return HLEnglishComponent; });
/* harmony import */ var _Papers_HLEnglishPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLEnglishPapers */ "./src/app/Papers/HLEnglishPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function HLEnglishComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLEnglishComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLEnglishComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class HLEnglishComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        for (var paper of _Papers_HLEnglishPapers__WEBPACK_IMPORTED_MODULE_0__["HLEnglishPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLEnglishComponent.ɵfac = function HLEnglishComponent_Factory(t) { return new (t || HLEnglishComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HLEnglishComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HLEnglishComponent, selectors: [["app-higher-level-english"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLEnglishComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "English Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function HLEnglishComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, HLEnglishComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, HLEnglishComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, HLEnglishComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9lbmdsaXNoL2VuZ2xpc2guY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HLEnglishComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-higher-level-english',
                templateUrl: 'english.component.html',
                styleUrls: ['english.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/english/index.ts":
/*!***********************************************!*\
  !*** ./src/app/higher-level/english/index.ts ***!
  \***********************************************/
/*! exports provided: HLEnglishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _english_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./english.component */ "./src/app/higher-level/english/english.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLEnglishComponent", function() { return _english_component__WEBPACK_IMPORTED_MODULE_0__["HLEnglishComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/french/french.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/higher-level/french/french.component.ts ***!
  \*********************************************************/
/*! exports provided: HLFrenchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLFrenchComponent", function() { return HLFrenchComponent; });
/* harmony import */ var _Papers_HLFrenchPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLFrenchPapers */ "./src/app/Papers/HLFrenchPapers.ts");
/* harmony import */ var _Papers_SoundFilesFrench__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Papers/SoundFilesFrench */ "./src/app/Papers/SoundFilesFrench.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function HLFrenchComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r0.paperLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLFrenchComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Aural Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r1.auralLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLFrenchComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Sound File ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r2.soundLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLFrenchComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r3.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
class HLFrenchComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasPaper = false;
        this.hasAural = false;
        this.hasSound = false;
        this.hasMark = false;
        this.paperLink = "";
        this.auralLink = "";
        this.soundLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasPaper = false;
        this.hasAural = false;
        this.hasSound = false;
        this.hasMark = false;
        for (var paper of _Papers_HLFrenchPapers__WEBPACK_IMPORTED_MODULE_0__["HLFrenchPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    this.hasPaper = true;
                    this.paperLink = paper.link;
                }
                else if (paper.tipe == "AuralPaper") {
                    this.hasAural = true;
                    this.auralLink = paper.link;
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
        for (var sound of _Papers_SoundFilesFrench__WEBPACK_IMPORTED_MODULE_1__["SoundFilesFrench"]) {
            if ((sound.year == this.year)) {
                this.hasSound = true;
                this.soundLink = sound.link;
            }
        }
    }
}
HLFrenchComponent.ɵfac = function HLFrenchComponent_Factory(t) { return new (t || HLFrenchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"])); };
HLFrenchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HLFrenchComponent, selectors: [["app-higher-level-french"]], decls: 16, vars: 5, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLFrenchComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "French Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function HLFrenchComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, HLFrenchComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, HLFrenchComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, HLFrenchComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, HLFrenchComponent_div_15_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasPaper);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasAural);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasSound);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9mcmVuY2gvZnJlbmNoLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](HLFrenchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'app-higher-level-french',
                templateUrl: 'french.component.html',
                styleUrls: ['french.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/french/index.ts":
/*!**********************************************!*\
  !*** ./src/app/higher-level/french/index.ts ***!
  \**********************************************/
/*! exports provided: HLFrenchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _french_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./french.component */ "./src/app/higher-level/french/french.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLFrenchComponent", function() { return _french_component__WEBPACK_IMPORTED_MODULE_0__["HLFrenchComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/higher-level.component.ts":
/*!********************************************************!*\
  !*** ./src/app/higher-level/higher-level.component.ts ***!
  \********************************************************/
/*! exports provided: HigherLevelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HigherLevelComponent", function() { return HigherLevelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class HigherLevelComponent {
}
HigherLevelComponent.ɵfac = function HigherLevelComponent_Factory(t) { return new (t || HigherLevelComponent)(); };
HigherLevelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HigherLevelComponent, selectors: [["ng-component"]], decls: 39, vars: 0, consts: [[1, "head"], ["routerLink", "/"], ["routerLink", "/higher-level", 1, "active"], ["routerLink", "/ordinary-level"], [1, "TopBar"], ["routerLink", "/higher-level/english"], ["routerLink", "/higher-level/irish"], ["routerLink", "/higher-level/maths"], ["routerLink", "/higher-level/applied-maths"], ["routerLink", "/higher-level/physics"], ["routerLink", "/higher-level/dcg"], ["routerLink", "/higher-level/french"], [1, "jumbotron"], [1, "container"], [1, "row"], [1, "col-sm-8", "offset-sm-2"]], template: function HigherLevelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Higher Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Ordinary Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "English");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Irish");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Maths");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Applied Maths");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Physics");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "DCG");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "French");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9oaWdoZXItbGV2ZWwuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HigherLevelComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: 'higher-level.component.html',
                styleUrls: ['./higher-level.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/higher-level/home/home.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/higher-level/home/home.component.ts ***!
  \*****************************************************/
/*! exports provided: HLHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLHomeComponent", function() { return HLHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class HLHomeComponent {
}
HLHomeComponent.ɵfac = function HLHomeComponent_Factory(t) { return new (t || HLHomeComponent)(); };
HLHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HLHomeComponent, selectors: [["ng-component"]], decls: 8, vars: 0, consts: [[1, "Title"], [1, "Intro"]], template: function HLHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Higher Level Examination Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Please select a subject");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".Title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  color: aliceblue;\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  color: rgb(68, 142, 207);\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  list-style-type: none;\r\n  padding: 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGlnaGVyLWxldmVsL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5UaXRsZSBoMSB7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxufVxyXG5cclxuLkludHJvIGEge1xyXG4gIGNvbG9yOiByZ2IoNjgsIDE0MiwgMjA3KTtcclxufVxyXG5cclxuLkludHJvIGxpIHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMTZweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HLHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: 'home.component.html',
                styleUrls: ['./home.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/higher-level/home/index.ts":
/*!********************************************!*\
  !*** ./src/app/higher-level/home/index.ts ***!
  \********************************************/
/*! exports provided: HLHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/higher-level/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLHomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["HLHomeComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/index.ts":
/*!***************************************!*\
  !*** ./src/app/higher-level/index.ts ***!
  \***************************************/
/*! exports provided: HigherLevelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _higher_level_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./higher-level.component */ "./src/app/higher-level/higher-level.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HigherLevelComponent", function() { return _higher_level_component__WEBPACK_IMPORTED_MODULE_0__["HigherLevelComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/irish/index.ts":
/*!*********************************************!*\
  !*** ./src/app/higher-level/irish/index.ts ***!
  \*********************************************/
/*! exports provided: HLIrishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _irish_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./irish.component */ "./src/app/higher-level/irish/irish.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLIrishComponent", function() { return _irish_component__WEBPACK_IMPORTED_MODULE_0__["HLIrishComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/irish/irish.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/higher-level/irish/irish.component.ts ***!
  \*******************************************************/
/*! exports provided: HLIrishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLIrishComponent", function() { return HLIrishComponent; });
/* harmony import */ var _Papers_HLIrishPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLIrishPapers */ "./src/app/Papers/HLIrishPapers.ts");
/* harmony import */ var _Papers_SoundFilesIrish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Papers/SoundFilesIrish */ "./src/app/Papers/SoundFilesIrish.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function HLIrishComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLIrishComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLIrishComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Aural ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r2.audioLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function HLIrishComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r3.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
class HLIrishComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.hasAudio = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.audioLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.hasAudio = false;
        for (var audio of _Papers_SoundFilesIrish__WEBPACK_IMPORTED_MODULE_1__["SoundFilesIrish"]) {
            if (audio.year == this.year) {
                this.hasAudio = true;
                this.audioLink = audio.link;
            }
        }
        for (var paper of _Papers_HLIrishPapers__WEBPACK_IMPORTED_MODULE_0__["HLIrishPapers"]) {
            if (paper.year == this.year) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLIrishComponent.ɵfac = function HLIrishComponent_Factory(t) { return new (t || HLIrishComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"])); };
HLIrishComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HLIrishComponent, selectors: [["app-higher-level-irish"]], decls: 16, vars: 5, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLIrishComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Irish Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function HLIrishComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, HLIrishComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, HLIrishComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, HLIrishComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, HLIrishComponent_div_15_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasAudio);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9pcmlzaC9pcmlzaC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](HLIrishComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'app-higher-level-irish',
                templateUrl: 'irish.component.html',
                styleUrls: ['irish.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/maths/index.ts":
/*!*********************************************!*\
  !*** ./src/app/higher-level/maths/index.ts ***!
  \*********************************************/
/*! exports provided: HLMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maths_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maths.component */ "./src/app/higher-level/maths/maths.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLMathsComponent", function() { return _maths_component__WEBPACK_IMPORTED_MODULE_0__["HLMathsComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/maths/maths.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/higher-level/maths/maths.component.ts ***!
  \*******************************************************/
/*! exports provided: HLMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLMathsComponent", function() { return HLMathsComponent; });
/* harmony import */ var _Papers_HLMathsPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLMathsPapers */ "./src/app/Papers/HLMathsPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function HLMathsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLMathsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLMathsComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class HLMathsComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        for (var paper of _Papers_HLMathsPapers__WEBPACK_IMPORTED_MODULE_0__["HLMathsPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLMathsComponent.ɵfac = function HLMathsComponent_Factory(t) { return new (t || HLMathsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HLMathsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HLMathsComponent, selectors: [["app-maths"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLMathsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Maths Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function HLMathsComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, HLMathsComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, HLMathsComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, HLMathsComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9tYXRocy9tYXRocy5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HLMathsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-maths',
                templateUrl: 'maths.component.html',
                styleUrls: ['maths.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/higher-level/physics/index.ts":
/*!***********************************************!*\
  !*** ./src/app/higher-level/physics/index.ts ***!
  \***********************************************/
/*! exports provided: HLPhysicsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _physics_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.component */ "./src/app/higher-level/physics/physics.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HLPhysicsComponent", function() { return _physics_component__WEBPACK_IMPORTED_MODULE_0__["HLPhysicsComponent"]; });




/***/ }),

/***/ "./src/app/higher-level/physics/physics.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/higher-level/physics/physics.component.ts ***!
  \***********************************************************/
/*! exports provided: HLPhysicsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLPhysicsComponent", function() { return HLPhysicsComponent; });
/* harmony import */ var _Papers_HLPhysicsPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/HLPhysicsPapers */ "./src/app/Papers/HLPhysicsPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function HLPhysicsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Exam Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.paperLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function HLPhysicsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class HLPhysicsComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasPaper = false;
        this.hasMark = false;
        this.paperLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasPaper = false;
        this.hasMark = false;
        for (var paper of _Papers_HLPhysicsPapers__WEBPACK_IMPORTED_MODULE_0__["HLPhysicsPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    this.hasPaper = true;
                    this.paperLink = paper.link;
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
HLPhysicsComponent.ɵfac = function HLPhysicsComponent_Factory(t) { return new (t || HLPhysicsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HLPhysicsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HLPhysicsComponent, selectors: [["app-physics"]], decls: 12, vars: 3, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function HLPhysicsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Physics Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function HLPhysicsComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, HLPhysicsComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, HLPhysicsComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasPaper);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hpZ2hlci1sZXZlbC9waHlzaWNzL3BoeXNpY3MuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HLPhysicsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-physics',
                templateUrl: './physics.component.html',
                styleUrls: ['./physics.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class HomeComponent {
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["ng-component"]], decls: 28, vars: 0, consts: [[1, "head"], ["routerLink", "/", 1, "active"], ["routerLink", "/higher-level"], ["routerLink", "/ordinary-level"], [1, "Title"], [1, "Intro"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Higher Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Ordinary Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Welcome to Fundamental Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "The minimalist mobile-friendly alternative to examinations.ie");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "I've added all HL maths, DCG, Applied Maths, Physics, English & Irish papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Ordinary papers are kinda wip, I've got english & french");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Fairly big structure design change so site could be buggy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: [".Title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  color: aliceblue;\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  color: rgb(68, 142, 207);\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  list-style-type: none;\r\n  padding: 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuVGl0bGUgaDEge1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbn1cclxuXHJcbi5JbnRybyBhIHtcclxuICBjb2xvcjogcmdiKDY4LCAxNDIsIDIwNyk7XHJcbn1cclxuXHJcbi5JbnRybyBsaSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: 'home.component.html',
                styleUrls: ['./home.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/home/index.ts":
/*!*******************************!*\
  !*** ./src/app/home/index.ts ***!
  \*******************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/english/english.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/ordinary-level/english/english.component.ts ***!
  \*************************************************************/
/*! exports provided: OLEnglishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLEnglishComponent", function() { return OLEnglishComponent; });
/* harmony import */ var _Papers_OLEnglishPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/OLEnglishPapers */ "./src/app/Papers/OLEnglishPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function OLEnglishComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLEnglishComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLEnglishComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class OLEnglishComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        for (var paper of _Papers_OLEnglishPapers__WEBPACK_IMPORTED_MODULE_0__["OLEnglishPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
OLEnglishComponent.ɵfac = function OLEnglishComponent_Factory(t) { return new (t || OLEnglishComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
OLEnglishComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OLEnglishComponent, selectors: [["app-english"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function OLEnglishComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "English Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function OLEnglishComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OLEnglishComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, OLEnglishComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, OLEnglishComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZGluYXJ5LWxldmVsL2VuZ2xpc2gvZW5nbGlzaC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OLEnglishComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-english',
                templateUrl: 'english.component.html',
                styleUrls: ['english.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/ordinary-level/english/index.ts":
/*!*************************************************!*\
  !*** ./src/app/ordinary-level/english/index.ts ***!
  \*************************************************/
/*! exports provided: OLEnglishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _english_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./english.component */ "./src/app/ordinary-level/english/english.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OLEnglishComponent", function() { return _english_component__WEBPACK_IMPORTED_MODULE_0__["OLEnglishComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/french/french.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/ordinary-level/french/french.component.ts ***!
  \***********************************************************/
/*! exports provided: OLFrenchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLFrenchComponent", function() { return OLFrenchComponent; });
/* harmony import */ var _Papers_OLFrenchPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/OLFrenchPapers */ "./src/app/Papers/OLFrenchPapers.ts");
/* harmony import */ var _Papers_SoundFilesFrench__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Papers/SoundFilesFrench */ "./src/app/Papers/SoundFilesFrench.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function OLFrenchComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r0.paperLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function OLFrenchComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Aural Paper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r1.auralLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function OLFrenchComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Sound File ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r2.soundLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function OLFrenchComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r3.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
class OLFrenchComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasPaper = false;
        this.hasAural = false;
        this.hasSound = false;
        this.hasMark = false;
        this.paperLink = "";
        this.auralLink = "";
        this.soundLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasPaper = false;
        this.hasAural = false;
        this.hasSound = false;
        this.hasMark = false;
        for (var paper of _Papers_OLFrenchPapers__WEBPACK_IMPORTED_MODULE_0__["OLFrenchPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    this.hasPaper = true;
                    this.paperLink = paper.link;
                }
                else if (paper.tipe == "AuralPaper") {
                    this.hasAural = true;
                    this.auralLink = paper.link;
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
        for (var sound of _Papers_SoundFilesFrench__WEBPACK_IMPORTED_MODULE_1__["SoundFilesFrench"]) {
            if ((sound.year == this.year)) {
                this.hasSound = true;
                this.soundLink = sound.link;
            }
        }
    }
}
OLFrenchComponent.ɵfac = function OLFrenchComponent_Factory(t) { return new (t || OLFrenchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"])); };
OLFrenchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: OLFrenchComponent, selectors: [["app-higher-level-french"]], decls: 16, vars: 5, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function OLFrenchComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "French Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function OLFrenchComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, OLFrenchComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, OLFrenchComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, OLFrenchComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, OLFrenchComponent_div_15_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasPaper);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasAural);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasSound);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZGluYXJ5LWxldmVsL2ZyZW5jaC9mcmVuY2guY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](OLFrenchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'app-higher-level-french',
                templateUrl: 'french.component.html',
                styleUrls: ['french.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/ordinary-level/french/index.ts":
/*!************************************************!*\
  !*** ./src/app/ordinary-level/french/index.ts ***!
  \************************************************/
/*! exports provided: OLFrenchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _french_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./french.component */ "./src/app/ordinary-level/french/french.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OLFrenchComponent", function() { return _french_component__WEBPACK_IMPORTED_MODULE_0__["OLFrenchComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/home/home.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/ordinary-level/home/home.component.ts ***!
  \*******************************************************/
/*! exports provided: OLHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLHomeComponent", function() { return OLHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class OLHomeComponent {
}
OLHomeComponent.ɵfac = function OLHomeComponent_Factory(t) { return new (t || OLHomeComponent)(); };
OLHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OLHomeComponent, selectors: [["ng-component"]], decls: 8, vars: 0, consts: [[1, "Title"], [1, "Intro"]], template: function OLHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Ordinary Level Examination Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "One paper to pick from, you choose");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".Title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  color: aliceblue;\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  color: rgb(68, 142, 207);\r\n}\r\n\r\n.Intro[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  list-style-type: none;\r\n  padding: 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3JkaW5hcnktbGV2ZWwvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvb3JkaW5hcnktbGV2ZWwvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuVGl0bGUgaDEge1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbn1cclxuXHJcbi5JbnRybyBhIHtcclxuICBjb2xvcjogcmdiKDY4LCAxNDIsIDIwNyk7XHJcbn1cclxuXHJcbi5JbnRybyBsaSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OLHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: 'home.component.html',
                styleUrls: ['./home.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/ordinary-level/home/index.ts":
/*!**********************************************!*\
  !*** ./src/app/ordinary-level/home/index.ts ***!
  \**********************************************/
/*! exports provided: OLHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/ordinary-level/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OLHomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["OLHomeComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/index.ts":
/*!*****************************************!*\
  !*** ./src/app/ordinary-level/index.ts ***!
  \*****************************************/
/*! exports provided: OrdinaryLevelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ordinary_level_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ordinary-level.component */ "./src/app/ordinary-level/ordinary-level.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrdinaryLevelComponent", function() { return _ordinary_level_component__WEBPACK_IMPORTED_MODULE_0__["OrdinaryLevelComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/irish/index.ts":
/*!***********************************************!*\
  !*** ./src/app/ordinary-level/irish/index.ts ***!
  \***********************************************/
/*! exports provided: OLIrishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _irish_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./irish.component */ "./src/app/ordinary-level/irish/irish.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OLIrishComponent", function() { return _irish_component__WEBPACK_IMPORTED_MODULE_0__["OLIrishComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/irish/irish.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/ordinary-level/irish/irish.component.ts ***!
  \*********************************************************/
/*! exports provided: OLIrishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLIrishComponent", function() { return OLIrishComponent; });
/* harmony import */ var _Papers_OLIrishPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/OLIrishPapers */ "./src/app/Papers/OLIrishPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function OLIrishComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLIrishComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLIrishComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class OLIrishComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        for (var paper of _Papers_OLIrishPapers__WEBPACK_IMPORTED_MODULE_0__["OLIrishPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
OLIrishComponent.ɵfac = function OLIrishComponent_Factory(t) { return new (t || OLIrishComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
OLIrishComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OLIrishComponent, selectors: [["app-ordinary-level-irish"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function OLIrishComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Irish Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function OLIrishComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OLIrishComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, OLIrishComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, OLIrishComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZGluYXJ5LWxldmVsL2lyaXNoL2lyaXNoLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OLIrishComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-ordinary-level-irish',
                templateUrl: 'irish.component.html',
                styleUrls: ['irish.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/ordinary-level/maths/index.ts":
/*!***********************************************!*\
  !*** ./src/app/ordinary-level/maths/index.ts ***!
  \***********************************************/
/*! exports provided: OLMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maths_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maths.component */ "./src/app/ordinary-level/maths/maths.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OLMathsComponent", function() { return _maths_component__WEBPACK_IMPORTED_MODULE_0__["OLMathsComponent"]; });




/***/ }),

/***/ "./src/app/ordinary-level/maths/maths.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/ordinary-level/maths/maths.component.ts ***!
  \*********************************************************/
/*! exports provided: OLMathsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLMathsComponent", function() { return OLMathsComponent; });
/* harmony import */ var _Papers_OLMathsPapers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Papers/OLMathsPapers */ "./src/app/Papers/OLMathsPapers.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function OLMathsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper One ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r0.oneLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLMathsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Paper Two ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r1.twoLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function OLMathsComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Marking Scheme ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.markLink, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class OLMathsComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        this.oneLink = "";
        this.twoLink = "";
        this.markLink = "";
        this.checkoutForm = this.formBuilder.group({
            year: '',
        });
    }
    onSubmit() {
        this.year = this.checkoutForm.get('year').value;
        this.hasOne = false;
        this.hasTwo = false;
        this.hasMark = false;
        for (var paper of _Papers_OLMathsPapers__WEBPACK_IMPORTED_MODULE_0__["OLMathsPapers"]) {
            if ((paper.year == this.year)) {
                if (paper.tipe == "ExamPaper") {
                    if (paper.paper == "One") {
                        this.hasOne = true;
                        this.oneLink = paper.link;
                    }
                    else if (paper.paper == "Two") {
                        this.hasTwo = true;
                        this.twoLink = paper.link;
                    }
                }
                else {
                    this.hasMark = true;
                    this.markLink = paper.link;
                }
            }
        }
    }
}
OLMathsComponent.ɵfac = function OLMathsComponent_Factory(t) { return new (t || OLMathsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
OLMathsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OLMathsComponent, selectors: [["app-ordinary-level-maths"]], decls: 14, vars: 4, consts: [[1, "Title"], [3, "formGroup", "ngSubmit"], ["id", "year", "type", "text", "formControlName", "year", "placeholder", "Year"], [1, "Results"], [4, "ngIf"], ["target", "_blank", 3, "href"]], template: function OLMathsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Maths Papers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function OLMathsComponent_Template_form_ngSubmit_4_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OLMathsComponent_div_9_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, OLMathsComponent_div_11_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, OLMathsComponent_div_13_Template, 3, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.checkoutForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasOne);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasTwo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hasMark);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZGluYXJ5LWxldmVsL21hdGhzL21hdGhzLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OLMathsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-ordinary-level-maths',
                templateUrl: 'maths.component.html',
                styleUrls: ['maths.component.css']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/app/ordinary-level/ordinary-level.component.ts":
/*!************************************************************!*\
  !*** ./src/app/ordinary-level/ordinary-level.component.ts ***!
  \************************************************************/
/*! exports provided: OrdinaryLevelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdinaryLevelComponent", function() { return OrdinaryLevelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class OrdinaryLevelComponent {
}
OrdinaryLevelComponent.ɵfac = function OrdinaryLevelComponent_Factory(t) { return new (t || OrdinaryLevelComponent)(); };
OrdinaryLevelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OrdinaryLevelComponent, selectors: [["ng-component"]], decls: 24, vars: 0, consts: [[1, "head"], ["routerLink", "/"], ["routerLink", "/higher-level"], ["routerLink", "/ordinary-level", 1, "active"], [1, "TopBar"], ["routerLink", "/ordinary-level/english"], ["routerLink", "/ordinary-level/french"], [1, "jumbotron"], [1, "container"], [1, "row"], [1, "col-sm-8", "offset-sm-2"]], template: function OrdinaryLevelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Higher Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Ordinary Level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "English");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "French");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZGluYXJ5LWxldmVsL29yZGluYXJ5LWxldmVsLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrdinaryLevelComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: 'ordinary-level.component.html',
                styleUrls: ['./ordinary-level.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");



_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
        window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
    // Otherwise, log the boot error
}).catch(err => console.error(err));


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone-evergreen.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/
// import 'core-js/es6/reflect';
// import 'core-js/es7/reflect';
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/c/Programming/Papers/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map