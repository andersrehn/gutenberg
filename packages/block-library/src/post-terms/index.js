/**
 * WordPress dependencies
 */
import { postCategories as icon } from '@wordpress/icons';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import lazyLoad from '../utils/lazy-load';
import initBlock from '../utils/init-block';
import metadata from './block.json';

import enhanceVariations from './hooks';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	edit: lazyLoad( () => import( './edit' ) ),
};

export const init = () => {
	addFilter(
		'blocks.registerBlockType',
		'core/template-part',
		enhanceVariations
	);

	return initBlock( { name, metadata, settings } );
};
