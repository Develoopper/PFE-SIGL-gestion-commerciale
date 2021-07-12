export default (initState, name) => {
	return (state = initState, { type, payload }) => {
		switch (type) {
			case name + "/set":
				return payload;
			case name + "/update":
				return { ...state, ...payload };
			case name + "/unshift":
				return [payload, ...state];
			case name + "/push":
				return [...state, payload];
			default:
				return state;
		}
	};
};