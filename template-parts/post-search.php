<?php
/**
 * The template part for displaying results in search pages.
 */
?>
<article id="Post-<?php the_ID(); ?>" <?php post_class('Post'); ?>>

  <header class="Post-header">
    <?php the_title( sprintf( '<h1 class="Post-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

    <?php if ( 'post' == get_post_type() ) : ?>
    <div class="Post-meta">
      <?php lh_posted_on(); ?>
    </div>
    <?php endif; ?>
  </header>

  <div class="Post-summary">
    <?php the_excerpt(); ?>
  </div>

  <footer class="Post-footer">
    <?php lh_post_footer(); ?>
  </footer>

</article><!-- .Post -->
