using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Handson.Models;
using Google.Apis.YouTube.v3;
using Google.Apis.Services;
using Google.Apis.YouTube.v3.Data;
using System.Configuration;
using Handson.ViewModels;

namespace Handson.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string busca)
        {            
            YouTubeService youtube = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyDuzCAH-cX65tZxBLcXSvh3pKz0UB4bULI",
            });
            SearchResource.ListRequest listRequest = youtube.Search.List("snippet");
            listRequest.MaxResults = 50;
            listRequest.RegionCode = "BR";

            if (!string.IsNullOrEmpty(busca))
                listRequest.Q = busca;

            SearchListResponse resp = listRequest.Execute();
            List<YoutubeViewModel> lista = new List<YoutubeViewModel>();

            for (var i = 0; i < resp.Items.Count; i++)
            {
                YoutubeViewModel campos = new YoutubeViewModel();
                campos.id = resp.Items[i].Id.VideoId == null ? "https://www.youtube.com/channel/" + resp.Items[i].Id.ChannelId : "https://www.youtube.com/watch?v=" + resp.Items[i].Id.VideoId;
                campos.titulo = resp.Items[i].Snippet.Title;
                campos.descricao = resp.Items[i].Snippet.Description;
                campos.urlthumbnails = resp.Items[i].Snippet.Thumbnails.High.Url;
                lista.Add(campos);
            }

            ListaYoutubeViewModel listayoutube = new ListaYoutubeViewModel
            {
                lista = lista
            };
            return View(listayoutube);
        }
    }
}
