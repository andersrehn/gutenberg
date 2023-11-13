/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import CreatePatternModal from './create-pattern-modal';
import { PATTERN_SYNC_TYPES } from '../constants';

function getTermLabels( pattern, categories ) {
	// Theme patterns don't have an id and rely on core pattern categories.
	if ( ! pattern.id ) {
		return categories
			?.filter( ( category ) =>
				pattern.categories.includes( category.name )
			)
			.map( ( category ) => category.label );
	}

	return categories
		?.filter( ( category ) =>
			pattern.wp_pattern_category.includes( category.id )
		)
		.map( ( category ) => category.label );
}

export default function DuplicatePatternModal( {
	pattern,
	onClose,
	onSuccess,
} ) {
	const { createSuccessNotice } = useDispatch( noticesStore );
	const categories = useSelect( ( select ) => {
		const { getAllPatternCategories } = select( coreStore );

		return getAllPatternCategories();
	} );

	if ( ! pattern ) {
		return null;
	}

	const duplicatedProps = {
		content: pattern.content,
		defaultCategories: getTermLabels( pattern, categories ),
		defaultSyncType: ! pattern.id // Theme patterns don't have an ID.
			? PATTERN_SYNC_TYPES.unsynced
			: pattern.wp_pattern_sync_status || PATTERN_SYNC_TYPES.full,
		defaultTitle: sprintf(
			/* translators: %s: Existing pattern title */
			__( '%s (Copy)' ),
			typeof pattern.title === 'string'
				? pattern.title
				: pattern.title.raw
		),
	};

	function handleOnSuccess( { pattern: newPattern } ) {
		createSuccessNotice(
			sprintf(
				// translators: %s: The new pattern's title e.g. 'Call to action (copy)'.
				__( '"%s" duplicated.' ),
				newPattern.title.raw
			),
			{
				type: 'snackbar',
				id: 'patterns-create',
			}
		);

		onSuccess?.( { pattern: newPattern } );
	}

	return (
		<CreatePatternModal
			modalTitle={ __( 'Duplicate pattern' ) }
			confirmLabel={ __( 'Duplicate' ) }
			onClose={ onClose }
			onError={ onClose }
			onSuccess={ handleOnSuccess }
			{ ...duplicatedProps }
		/>
	);
}
