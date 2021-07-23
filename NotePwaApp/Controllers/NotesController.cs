using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotePwaApp.Models;

namespace NotePwaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        //Check Connectivity
        [HttpGet("check")]
        public async Task<ActionResult> GetCheck()
        {
            return Ok(true);
        }

        //Delete All
        [HttpGet("deleteall")]
        public async Task<ActionResult> GetDeleteAll()
        {
            var all = await _context.Notes.Where(a => !a.IsDelete).ToListAsync();
            foreach (var item in all)
            {
                item.IsDelete = true;
            }
            await _context.SaveChangesAsync();

            return Ok(true);
        }

        //IsDelete False
        [HttpPost("isdeletefalse")]
        public async Task<ActionResult> PostIsDeleteFalse(Note note)
        {
            var n = _context.Notes.Where(a => a.Id == note.Id);
            if (n.Any())
            {
                note.IsDelete = false;
                _context.Entry(note).State = EntityState.Modified;
            }
            else
            {
                _context.Notes.Add(note);
            }
            await _context.SaveChangesAsync();

            return Ok(true);
        }

        // Get All IsDelete False
        [HttpGet("getallisdelfalse")]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllIsDelFalse()
        {
            return await _context.Notes.Where(a => !a.IsDelete).ToListAsync();
        }

        // Get All
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<Note>>> GetAll()
        {
            var all = await _context.Notes.ToListAsync();

            foreach (var item in all)
            {
                item.IsDelete = false;
            }

            await _context.SaveChangesAsync();

            return await _context.Notes.ToListAsync();
        }









        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(string id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return new JsonResult(true);
        }

        // POST: api/Notes
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            var n = _context.Notes.Where(a => a.Id == note.Id);
            if (n.Any())
            {
                _context.Entry(note).State = EntityState.Modified;
            }
            else
            {
                _context.Notes.Add(note);
            }
            await _context.SaveChangesAsync();

            return new JsonResult(true);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(string id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return new JsonResult(true);
        }

        private bool NoteExists(string id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
