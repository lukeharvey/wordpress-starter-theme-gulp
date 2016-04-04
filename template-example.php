<?php
/**
 * Template Name: Example
 *
 * An example page template
 */

get_header(); ?>

  <main class="Main" role="main">

    <?php while ( have_posts() ) : the_post(); ?>

      <?php get_template_part( 'template-parts/content', 'page' ); ?>

    <?php endwhile; // end of the loop. ?>

  </main><!-- .Main -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
