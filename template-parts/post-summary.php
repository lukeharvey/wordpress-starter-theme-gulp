<?php
/**
 * The template for post summaries (as shown on homepage and category pages)
 */
?>
<article id="PostSummary-<?php the_ID(); ?>" <?php post_class(); ?>>

  <div class="PostSummary-content">
    <div class="PostSummary-header">
      <h1 class="PostSummary-title entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>
    </div>

    <div class="PostSummary-button">
      <a href="<?php the_permalink(); ?>" rel="bookmark">Read More</a>
    </div>
  </div>

</article><!-- .PostSummary -->
