<?php
/**
 * The template used for displaying page content in page.php
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('Page'); ?>>

  <header class="Page-header">
    <h1 class="Page-title"><?php the_title(); ?></h1>
  </header>

  <div class="Page-content">
    <?php the_content(); ?>
  </div>

</article><!-- .Page -->
