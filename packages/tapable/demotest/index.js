//https://juejin.im/post/5abf33f16fb9a028e46ec352
let SyncHook = require('../lib/SyncHook')
let AsyncParallelHook = require('../lib/AsyncParallelHook')
class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(["content"]),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
    }
    
    setSpeed(newSpeed) {
		// following call returns undefined even when you returned values
		this.hooks.accelerate.call(newSpeed);
    }
    
    warn(content) {
		// following call returns undefined even when you returned values
		this.hooks.brake.call(content);
    }
    
    useNavigationSystemPromise(source, target) {
		const routesList = ['home'];
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
            // res is undefined for AsyncParallelHook
            console.log(res)
            console.log('useNavigationSystemPromise')
            routesList.push('about')
            console.log(routesList)
			return routesList.slice(0)
		});
	}

	/* ... */
}



const myCar = new Car();

// Use the tap method to add a consument
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed1 => console.log(`Accelerating1 to ${newSpeed1}`));
myCar.hooks.accelerate.tap("LoggerPlugin2", newSpeed1 => console.log(`Accelerating2 to ${newSpeed1}`));

// myCar.hooks.brake.tap("WarningLampPlugin", (content) => console.warn(`warn lamp plugin:${content}`));

// myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
// 	// return a promise
// 	return new Promise((resolve)=>{
//         // 1
//         console.log(1,source,target,routesList)
//         routesList.push(target)
//         console.log(routesList)
//         resolve(true)
//     })
// });

myCar.setSpeed(100)
// myCar.warn("warn thins")
// myCar.useNavigationSystemPromise('home','about')