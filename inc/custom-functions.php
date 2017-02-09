<?php

/**
 * Output image ratio.
 *
 * @param int $img_id Image ID.
 */

function lh_image_ratio($img_id) {
  $img_data = wp_get_attachment_image_src( $img_id, 'original' );
  $img_width = $img_data[1];
  $img_height = $img_data[2];
  $img_ratio = $img_height / $img_width * 100;

  echo round( $img_ratio, 4 ) . '%';
}

/**
 * Add lazyloading markup to responsive images
 */

function lh_lazy_images( $attr ) {
  if ($attr['class'] == 'lazyload') {
    $src = $attr['src'];
    $srcset = isset($attr['srcset']) ? $attr['srcset'] : '';

    $attr['src'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    $attr['data-src'] = $src;

    if ( !empty( $srcset ) ) {
      $attr['sizes'] = '';
      $attr['data-sizes'] = 'auto';
      $attr['srcset'] = '';
      $attr['data-srcset'] = $srcset;
    }
  }

  return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'lh_lazy_images', 10, 2 );
add_filter( 'post_thumbmnail_html', 'lh_lazy_images', 10, 2 );

/**
 * Move jQuery to the HTML footer
 *
 * see https://peterwilson.cc/code-samples/load-jquery-in-the-wordpress-footer/
 */

function lh_jquery_to_footer( &$wp_scripts ) {

  if ( is_admin() ) {
    return;
  }

  $wp_scripts->add_data( 'jquery',         'group', 1 );
  $wp_scripts->add_data( 'jquery-core',    'group', 1 );
  $wp_scripts->add_data( 'jquery-migrate', 'group', 1 );

}
add_action( 'wp_default_scripts', 'lh_jquery_to_footer' );
