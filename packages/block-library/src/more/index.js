/**
 * WordPress dependencies
 */
import { more as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import lazyLoad from '../utils/lazy-load';
import initBlock from '../utils/init-block';

import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {},
	__experimentalLabel( attributes, { context } ) {
		if ( context === 'accessibility' ) {
			return attributes.customText;
		}
	},
	transforms,
	edit: lazyLoad( () => import( './edit' ) ),
	save,
};

export const init = () => initBlock( { name, metadata, settings } );
