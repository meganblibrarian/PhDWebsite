---
title: 'Qualitative Research in Online Spaces Chapters 5 & 6 Quiz'
show_comments: false
layout: "simple"
---

<!-- layouts/shortcodes/quiz.html -->
<iframe
  id="quiz-frame-{{ .Get "id" | default "1" }}"
  src="{{ .Get "src" }}"
  width="100%"
  height="600"
  style="border:none; display:block; overflow:hidden;"
  scrolling="no"
  title="{{ .Get "title" | default "Quiz" }}">
</iframe>
<script>
  window.addEventListener('message', function(e) {
    var frame = document.getElementById('quiz-frame-{{ .Get "id" | default "1" }}');
    if (frame && e.data && e.data.type === 'quizResize') {
      frame.style.height = (e.data.height + 40) + 'px';
    }
  });
</script>