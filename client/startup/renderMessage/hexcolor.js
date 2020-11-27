import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { settings } from '../../../app/settings';
import { callbacks } from '../../../app/callbacks';

Meteor.startup(() => {
	Tracker.autorun(async () => {
		const isEnabled = settings.get('HexColorPreview_Enabled') === true;

		if (!isEnabled) {
			callbacks.remove('renderMessage', 'hexcolor');
			return;
		}

		const { createHexColorPreviewMessageRenderer } = await import('../../../app/colors/client');

		const renderMessage = createHexColorPreviewMessageRenderer();

		callbacks.add('renderMessage', renderMessage, callbacks.priority.MEDIUM, 'hexcolor');
	});
});
