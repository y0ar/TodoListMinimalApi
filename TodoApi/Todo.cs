﻿using System.ComponentModel.DataAnnotations;

namespace TodoApi
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
