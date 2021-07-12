import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Prompt } from "react-router-dom";

const useUnsavedChangesWarning = (message = "Etes-vous sure de vouloir quitter ?") => {
	const savedState = useSelector(state => state.savedState);

	useEffect(() => {
		//Detecting browser closing
		window.onbeforeunload = Object.values(savedState).includes(false) && (() => 'abc');

		return () => {
				window.onbeforeunload = null;
		};
	}, [savedState]);

	return <Prompt when={Object.values(savedState).includes(false)} message={message} />;
};

export default useUnsavedChangesWarning;
