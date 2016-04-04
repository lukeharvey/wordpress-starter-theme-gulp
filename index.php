<?php
/**
 * The default template file.
 */

get_header(); ?>

  <?php if ( have_posts() ) : ?>

    <section class="Index">

      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'template-parts/post' ); ?>

      <?php endwhile; ?>

      <?php the_posts_navigation(); ?>

    </section><!-- .Index -->

  <?php else : ?>

    <?php get_template_part( 'template-parts/page', 'not-found' ); ?>

  <?php endif; ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
